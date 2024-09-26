from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.dialects.postgresql import ENUM
from enum import Enum

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'user'

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    name = db.Column(db.String(30), nullable=True)
    last_name = db.Column(db.String(30), nullable=True)
    location = db.Column(db.String(50), nullable=True)
    language = db.Column(db.String(70), nullable=True)
    gender = db.Column(db.String(50), nullable=True)
    profile_pic = db.Column(db.String(255), nullable=True)
    description = db.Column(db.String(250), nullable=True)
    phone = db.Column(db.String(20), nullable=True)
    average_score = db.Column(db.Float, nullable=True)

    # Relationships to Review model
    reviews_written = db.relationship('Review', foreign_keys='Review.reviewer_id', back_populates='reviewer', lazy='dynamic')
    reviews_received = db.relationship('Review', foreign_keys='Review.reviewee_id', back_populates='reviewee', lazy='dynamic')

    # Relationships to Match model
    match_from = db.relationship('Match', foreign_keys='Match.match_from_id', back_populates='match_from')
    match_to = db.relationship('Match', foreign_keys='Match.match_to_id', back_populates='match_to')

    # Relationships to Favorite model
    favorite_from = db.relationship('Favorite', foreign_keys='Favorite.favorite_from_id', back_populates='favorite_from')
    favorite_to = db.relationship('Favorite', foreign_keys='Favorite.favorite_to_id', back_populates='favorite_to')

    def calculate_average_score(self):
        reviews = Review.query.filter_by(reviewee_id=self.id).all()
        print(f"Calculando average_score para user_id {self.id}, reseñas: {len(reviews)}")
        
        if not reviews:
            self.average_score = 3  # Media if 0 reviews
            db.session.commit() 
            return 3
        
        total_score = sum(review.score for review in reviews)
        average = total_score / len(reviews)
        self.average_score = average  
        db.session.commit() 
        print(f"Nuevo average_score para user_id {self.id}: {self.average_score}")
        return average

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "name": self.name or "",
            "last_name": self.last_name or "",
            "location": self.location or "",
            "gender": self.gender or "",
            "language": self.language or "",
            "profile_pic": self.profile_pic or "",
            "description": self.description or "",
            "phone": self.phone or "",
            "is_active": self.is_active,
             "average_score": self.average_score
        }

class Favorite(db.Model):
    __tablename__ = 'favorite'
    
    favorite_id = db.Column(db.Integer, primary_key=True)
    favorite_from_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    favorite_from = db.relationship('User', foreign_keys=[favorite_from_id], back_populates='favorite_from')
    favorite_to_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    favorite_to = db.relationship('User', foreign_keys=[favorite_to_id], back_populates='favorite_to')

class MatchStatus(Enum):
    PENDING = 'Pending'
    ACCEPTED = 'Accepted'
    REJECTED = 'Rejected'
    IGNORED = 'Ignored'

class Match(db.Model):
    __tablename__ = 'matches'
    
    match_id = db.Column(db.Integer, primary_key=True)
    match_from_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    match_from = db.relationship('User', foreign_keys=[match_from_id], back_populates='match_from')
    match_to_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    match_to = db.relationship('User', foreign_keys=[match_to_id], back_populates='match_to')
    match_status = db.Column(ENUM(*[status.value for status in MatchStatus], name='match_status_enum'), nullable=False)

class SkillNameEnum(Enum):
    COOKING = 'Cooking'
    SPORTS = 'Sports'
    MUSIC = 'Music'
    LANGUAGES = 'Languages'
    ART = 'Art'
    OTHERS = 'Others'

class Categories(db.Model):
    __tablename__ = 'categories'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    skill_name = db.Column(ENUM(*[e.value for e in SkillNameEnum], name='skill_name_enum'), nullable=False)
    description = db.Column(db.String(250), nullable=True)
    
    __table_args__ = (
        db.UniqueConstraint('user_id', 'skill_name', name='unique_user_skill'),
    )
    
    user = db.relationship('User', backref=db.backref('categories', lazy=True))

class Review(db.Model):
    __tablename__ = 'reviews'
    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    reviewer_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    reviewee_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    score = db.Column(db.Integer, nullable=False)
    comment = db.Column(db.String(250), nullable=True)
    
    # Relationship to the User model
    reviewer = db.relationship('User', foreign_keys=[reviewer_id], back_populates='reviews_written')
    reviewee = db.relationship('User', foreign_keys=[reviewee_id], back_populates='reviews_received')

    def update_average_score(self):
        self.reviewee.media_average = self.reviewee.calculate_average_score()
        db.session.commit()

class BestSharers(db.Model):
    __tablename__ = 'best_sharers'
    
    id = db.Column(db.Integer, db.ForeignKey('user.id'), primary_key=True)
    media_average = db.Column(db.Float, nullable=True)

    user = db.relationship('User', backref=db.backref('best_sharers', uselist=False, lazy=True))

def update_best_sharers():
    BestSharers.query.delete()

    users = User.query.all()
    for user in users:
        media_average = user.calculate_average_score()
        if media_average is not None:
            best_sharer = BestSharers(id=user.id, media_average=media_average)
            db.session.add(best_sharer)

    db.session.commit()


class TokenRestorePassword(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    reset_token = db.Column(db.String(255), nullable=False, unique=True)
    expires_at = db.Column(db.DateTime, nullable=False)
    user = db.relationship('User', backref=db.backref('tokens', lazy=True))

    def __repr__(self):
        return f'<TokenRestorePassword {self.reset_token}>' 