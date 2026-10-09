from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/login", methods=["GET", "POST"])
def login():

    if request.method == "POST":
        username = request.form["username"]
        password = request.form["password"]

        # Temporary login system
        if username == "admin" and password == "1234":
            return f"Welcome, {username}! Login successful."

        return "Invalid username or password."

    return render_template("login.html")


@app.route("/signup", methods=["GET", "POST"])
def signup():

    if request.method == "POST":
        username = request.form["username"]
        email = request.form["email"]
        password = request.form["password"]

        return f"Account created successfully for {username}!"

    return render_template("signup.html")

@app.route("/tools")
def tools_dashboard():
    return render_template("tools.html")

@app.route("/tools/word-counter")
def word_counter():
    return render_template("word_counter.html")


@app.route("/tools/case-converter")
def case_converter():
    return render_template("case_converter.html")


if __name__ == "__main__":
    app.run(debug=True)