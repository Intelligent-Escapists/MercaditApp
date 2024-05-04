
def send_email(recipient, message, body_message):
    from app import return_mail
    from flask_mail import Message

    mail = return_mail()
    msg = Message(message,sender='mercaditapp@gmail.com', recipients=[recipient])
    print("Body: ",body_message)

    msg.body = body_message
    mail.send(msg)

 