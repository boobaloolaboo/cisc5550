# This is a simple example web app that is meant to illustrate the basics.
from flask import Flask, render_template, redirect, g, request, url_for, jsonify
from flask_cors import CORS
import requests
import sqlite3

DATABASE = 'todolist.db'

app = Flask(__name__)
app.config.from_object(__name__)

cors = CORS(app, origins='*')


@app.route("/")
def show_list():
      resp = requests.get("http://localhost:8080/api/items")
      resp = resp.json()
      return render_template('App.jsx', todolist=resp)


@app.route("/api/items")
def get_items():
    db = get_db()
    cur = db.execute('SELECT what_to_do, due_date, status FROM entries')
    entries = cur.fetchall()
    tdlist = [dict(what_to_do=row[0], due_date=row[1], status=row[2]) for row in entries]
    return jsonify(tdlist)


@app.route("/api/items/add", methods=['POST'])
def add_entry():
    db = get_db()
    db.execute('insert into entries (what_to_do, due_date) values (?, ?)',
               [request.form['what_to_do'], request.form['due_date']])
    db.commit()
    return redirect("https://boobaloolaboo.github.io/cisc5550/")


@app.route("/api/items/delete/<item>")
def delete_entry(item):
    db = get_db()
    db.execute("DELETE FROM entries WHERE what_to_do='"+item+"'")
    db.commit()
    return redirect("https://boobaloolaboo.github.io/cisc5550/")


@app.route("/api/items/mark/<item>")
def mark_as_done(item):
    db = get_db()
    db.execute("UPDATE entries SET status = CASE WHEN status = 'checked' THEN '' ELSE 'checked' END WHERE what_to_do='"+item+"'")
    db.commit()
    return redirect("https://boobaloolaboo.github.io/cisc5550/")


def get_db():
    """Opens a new database connection if there is none yet for the
    current application context.
    """
    if not hasattr(g, 'sqlite_db'):
        g.sqlite_db = sqlite3.connect(app.config['DATABASE'])
    return g.sqlite_db


@app.teardown_appcontext
def close_db(error):
    """Closes the database again at the end of the request."""
    if hasattr(g, 'sqlite_db'):
        g.sqlite_db.close()


if __name__ == "__main__":
    app.run(debug=True, port=8080)
