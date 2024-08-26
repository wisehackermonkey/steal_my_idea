#!/usr/bin/env python
# stealmyidea.com Source Code
from flask import Flask, render_template, request
import sqlite3
import time
con = sqlite3.connect("db/database.db")
# global cur
cur = con.cursor()
is_db_exist = cur.execute("SELECT name FROM sqlite_master WHERE type='table' AND name='posts';").fetchall()
if is_db_exist == []:
    global res
    res = cur.execute("""
CREATE TABLE posts(rowid, text TEXT, username TEXT, date TEXT, votes INT)
""")
    res.fetchone()
con.close()

app = Flask(__name__)

def insert_post(text, votes):
    con = sqlite3.connect("db/database.db")
    cur = con.cursor()
    username= "anonynous"
    date = time.strftime("%Y-%m-%d")
    res = cur.execute(f"""INSERT INTO posts
    VALUES           ("{text}", "{username}", "{date}",{votes})
""")
    con.commit()
    con.close()
    text
    return res

def get_posts():
    con = sqlite3.connect("db/database.db")
    cur = con.cursor()
    res = cur.execute("SELECT rowid, * FROM posts")
    posts = res.fetchall()
    con.close()
    return posts

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/posts")
def posts():
    posts = get_posts()
    posts
    return render_template("posts.html", posts=posts)

@app.route("/post", methods=['POST'])
def create_post():
    text = request.form["text"]
    print(text)
    res = insert_post(text,"oranc","20240826",1)
    return "1"+ str(res)

@app.route("/vote/", methods=["POST"])
def update_vote(vote):
    vote = request.form["vote"]
    rowid = request.form["post_id"]

    con = sqlite3.connect("db/database.db")
    cur = con.cursor()
    cur.execute("""
    UPDATE posts SET vote = {vote} WHERE rowid = {rowid} 
                """)
    con.commit()
    con.close()
    return "+122"

# 404 error
@app.errorhandler(404)
def page_not_found():
    return "404",404

app.run("0.0.0.0", port=3000, debug=True)