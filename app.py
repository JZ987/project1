from flask import Flask, request, jsonify, render_template
import pymysql.cursors
import json

app = Flask(__name__)

conn = pymysql.connect(host = 'localhost',
					   user='username',
					   password='cs1122project',
					   database='todo')
# conn.cursor().execute('CREATE DATABASE todo')
# conn.cursor().execute("CREATE TABLE todolist (id smallint unsigned not null auto_increment, things varchar(65) not null, primary key (id));")

try:
    with conn.cursor() as cursor:
    	sql = "SELECT * FROM todolist"
    	cursor.execute(sql)
    	result = cursor.fetchall()
    	print(result)

finally:
	print("connect successfully")

@app.route("/")
def home():
	return render_template("home.html")

@app.route("/todo/create", methods=["POST"])
def createItem():
    newItem = request.form["InputData"]
    if(newItem !=""):
        try:
    		with conn.cursor() as cursor:
        		sql = "INSERT INTO `todolist` (`things`) VALUES (%s)"
        		cursor.execute(sql, (newItem))
        		priKey = cursor.lastrowid
    		conn.commit()
    	finally:
    		return jsonify({"success" : newItem, 'key' : priKey})
    return jsonify({"error" : "no input"})

@app.route("/todo/read")
def getList():
	try:
	    with conn.cursor() as cursor:
	    	sql = "SELECT * FROM todolist"
	    	cursor.execute(sql)
	    	result = cursor.fetchall()
	finally:
		return jsonify(result)

@app.route("/todo/delete", methods=["DELETE"])
def deleteItem():
	Deleted = request.form["data"]
	key = request.form["key"]
	try:
	    with conn.cursor() as cursor:
	    	sql = "DELETE FROM todolist WHERE id=(%s)"
	    	cursor.execute(sql,(key))
	    conn.commit()
	finally:
		return jsonify({'success' : Deleted})

@app.route("/todo/update", methods=["PUT"])
def updateItem():
	Old = request.form['old']
	New = request.form['item']
	key = request.form['key']
	try:
	    with conn.cursor() as cursor:
	    	sql = "UPDATE todolist SET things =(%s) WHERE id=(%s)"
	    	cursor.execute(sql,(New, key))
	    conn.commit()
	finally:
		return jsonify({'success' : New})


if __name__ == "__main__":
	app.run (debug=True)
