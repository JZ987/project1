from flask import Flask, render_template, request, jsonify, session
import json

todo = []
app = Flask(__name__)
app.secret_key = "the_secrete_key_which!.di!345"

@app.route("/")
def home():
	return render_template("home.html")

@app.route("/todo/create", methods=["POST"])
def createItem():
    newItem = request.form["InputData"]
    if(newItem !=""):
        todo.append(newItem)
        session["user"] = todo
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
	return jsonify(session["user"])


@app.route("/todo/update", methods=["PUT"])
def updateItem():
	Old = request.form['old']
	New = request.form['item']
	todo[todo.index(Old)] = New
	session['user']=todo
	return jsonify({"success" : New})


if __name__ == "__main__":
	app.run (debug=True)