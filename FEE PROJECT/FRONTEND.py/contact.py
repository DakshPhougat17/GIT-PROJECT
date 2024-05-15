from flask import Flask, render_template, request, redirect, url_for
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///contacts.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class Contact(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    message = db.Column(db.Text, nullable=False)
@app.before_request
def before_request():
    db.create_all()

@app.route('/')
def index():
    return render_template("contact.html")

@app.route('/send_email', methods=['POST'])
def send_email():
    if request.method == 'POST':
        name = request.form['name']
        email = request.form['email']
        message = request.form['message']
        new_contact = Contact(name=name, email=email, message=message)
        db.session.add(new_contact)
        db.session.commit()

        return redirect(url_for('index'))

if __name__ == '__main__':
    app.run(debug=True)
