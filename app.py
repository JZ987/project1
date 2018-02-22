from flask import Flask, render_template, request, jsonify, session
import pymysql.cursors
import json


todo = []
app = Flask(__name__)
app.secret_key = "the_secrete_key_which!.di!345"


conn = pymysql.connect(host = 'localhost', 
					   user='username', 
					   password='cs1122project',
					   database='todo'
					   )
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
        todo.append(newItem)
        session["user"] = todo
        try:
    		with conn.cursor() as cursor:
        		sql = "INSERT INTO `todolist` (`things`) VALUES (%s)"
        		cursor.execute(sql, (newItem))
    		conn.commit()
    	finally:
    		return jsonify({"success" : session["user"][-1]})
    return jsonify({"error" : "no input"})

@app.route("/todo/read")
def getList():
	session["user"] = todo
	return jsonify(session["user"])

@app.route("/todo/delete", methods=["DELETE"])
def deleteItem():
	Deleted = request.data.decode("utf-8")
	global todo
	todo = [ x for x in todo if x != Deleted]
	session['user']=todo
	return jsonify({'success' : Deleted})


@app.route("/todo/update", methods=["PUT"])
def updateItem():
	Old = request.form['old']
	New = request.form['item']
	todo[todo.index(Old)] = New
	session['user']=todo
	return jsonify({"success" : New})


if __name__ == "__main__":
	app.run (debug=True)