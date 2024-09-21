import requests
import random
import string

BASE_URL = 'https://obscure-orbit-wp66v45p7rrcq5q-3001.app.github.dev'
NUMBER_OF_USERS = 10  
PASSWORD = 'Password1234'  

def generate_random_email():
    username = ''.join(random.choices(string.ascii_lowercase, k=8))
    domain = random.choice(['email.com', 'test.com', 'example.com'])
    return f'{username}@{domain}'

def generate_random_name():
    return ''.join(random.choices(string.ascii_letters, k=7)).capitalize()

def register_user(email, password):
    signup_url = f'{BASE_URL}/signup'
    signup_payload = {
        "email": email,
        "password": password
    }
    response = requests.post(signup_url, json=signup_payload)
    
    if response.status_code == 201:
        print(f"Usuario {email} creado exitosamente.")
        return True
    else:
        print(f"Error al crear el usuario {email}: {response.json()}")
        return False

def login_user(email, password):
    login_url = f'{BASE_URL}/login'
    login_payload = {
        "email": email,
        "password": password
    }
    response = requests.post(login_url, json=login_payload)
    
    if response.status_code == 200:
        token = response.json()['access_token']
        print(f"Login exitoso para {email}.")
        return token
    else:
        print(f"Error en el login para {email}: {response.json()}")
        return None

def update_user_profile(token):
    update_url = f'{BASE_URL}/update_user'
    headers = {
        'Authorization': f'Bearer {token}'
    }
    update_payload = {
        "name": generate_random_name(),
        "last_name": generate_random_name(),
        "phone": f'+{random.randint(100000000, 999999999)}',
        "location": random.choice(['Madrid', 'Barcelona', 'Sevilla', 'Valencia', 'Bilbao']),
        "gender": random.choice(['Male', 'Female', 'Other']),
        "description": "Este es un ejemplo de descripción."
    }
    response = requests.put(update_url, json=update_payload, headers=headers)
    
    if response.status_code == 200:
        print(f"Perfil del usuario actualizado correctamente.")
    else:
        print(f"Error al actualizar el perfil: {response.json()}")

def main():
    for i in range(NUMBER_OF_USERS):
        email = generate_random_email()
        
        if register_user(email, PASSWORD):
            token = login_user(email, PASSWORD)
            if token:
                update_user_profile(token)

if __name__ == '__main__':
    main()
