from dotenv import load_dotenv
import os

load_dotenv()
class Applicationconfig:
    SECRET_KEY = os.environ.get('SECRET_KEY')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_ECHO = True
    SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://lab:Developer123!@localhost:3306/mercaditApp'

    MAIL_SERVER = 'smtp.gmail.com'
    MAIL_PORT = 587
    MAIL_USERNAME = os.environ.get('MAIL_USERNAME') 
    MAIL_PASSWORD = os.environ.get('MAIL_PASSWORD')   
    MAIL_USE_TLS = True
    MAIL_USE_SSL = False

    UPLOAD_FOLDER = os.path.join(os.getcwd(), 'product-images')