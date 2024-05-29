from dotenv import load_dotenv
import os

# Cargar las variables de entorno desde el archivo .env
load_dotenv()


class Applicationconfig:
    SECRET_KEY = os.environ.get("SECRET_KEY")
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_ECHO = True

    # Construir la URI de la base de datos utilizando las variables de entorno
    SQLALCHEMY_DATABASE_URI = (
        f"mysql+pymysql://{os.environ.get('MYSQL_USER')}:"
        f"{os.environ.get('MYSQL_PASSWORD')}@"
        f"{os.environ.get('MYSQL_HOST')}:"
        f"{os.environ.get('MYSQL_PORT')}/"
        f"{os.environ.get('MYSQL_DATABASE')}"
    )

    MAIL_SERVER = "smtp.gmail.com"
    MAIL_PORT = 587
    MAIL_USERNAME = os.environ.get("MAIL_USERNAME")
    MAIL_PASSWORD = os.environ.get("MAIL_PASSWORD")
    MAIL_USE_TLS = True
    MAIL_USE_SSL = False

    UPLOAD_FOLDER = os.path.join(os.getcwd(), "product-images")