#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Mon Feb 12 14:02:28 2018

@author: Zhoukx.joseph
"""
from flask import Flask, render_template, request, json, session, jsonify, redirect

todo = []
app = Flask(__name__)
app.secret_key = "\xa0\x1f\x02v#\xa1\x1e;\xfc\x0f/\x13Cz\x0e\x91\x1e\x08\x9a5\xb0Je\x01"

@app.route('/')
def index():
    session['username'] = todo
    return render_template("index.html")

@app.route('/todo/create', methods=['POST'])
def createItem():
    newItem = request.form['newItem']
    todo.append(newItem)
    session['username'] = todo
    return jsonify({"result" : "success"})

@app.route('/todo/read')
def fetchItems():
    return jsonify({"result" : "success", "data" : session['username']})

@app.route('/todo/update', methods=['PUT'])
def updateItems():
    index = todo.index(request.form['old'])
    todo[index] = request.form['item']
    session['username'] = todo
    return jsonify({"result" : "success"})

@app.route('/todo/delete', methods=['DELETE'])
def deteleItem():
    todo.remove(request.form['item'])
    session['username'] = todo
    return jsonify({"result" : "success"})

if __name__ == '__main__':
    app.run(debug=True)
