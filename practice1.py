#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Mon Feb 12 14:02:28 2018

@author: Zhoukx.joseph
"""
from flask import Flask, render_template, request, json, jsonify, redirect

todo = []

app = Flask(__name__)

@app.route('/')
def index():
    return render_template("index.html")

@app.route('/todo/create', methods=['POST'])
def createItem():
    newItem = request.form['newItem']
    todo.append(newItem)
    return jsonify({"result" : todo[-1]})

@app.route('/todo/read')
def fetchItems():
    return jsonify(todo)

# @app.route('/todo/update', methods=['PUT'])
# def updateItems():
#     pass
#
@app.route('/todo/delete', methods=['DELETE'])
def deteleItem():
    todo.remove(request.form['item'])
    return jsonify({"result" : "success"})

if __name__ == '__main__':
    app.run(debug=True)
