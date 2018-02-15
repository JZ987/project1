#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Mon Feb 12 14:02:28 2018

@author: Zhoukx.joseph
"""
from flask import Flask, jsonify,render_template,request, abort, redirect
import json
from uuid import uuid4
todo = []
token = None

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('home.html', todo = todo)

@app.route('/todo/create', methods=['POST'])
def createItem():
    if(request.form['myInput']!=''):
        newItem = request.form['myInput']
        todo.append(newItem)
    return redirect('/')

@app.route('/todo/read')
def fetchItems():
    return jsonify(todo)
#@app.route('/update', methods = ['PUT'])
#def updateTodo():
#    pass
#
#@app.route('/delete', methods = ['DELETE'] )
#def deleteTodo():
#    if(request.headers.get('token')!= token or token is None):
#        return abort(403)
#    requestData = request.get_json().get('classmates')
#    global ToDo
#    ToDo = list(filter(lambda x: x not in requestData, ToDo))
#    return jsonify(ToDo)

if __name__ == '__main__':
    app.run(debug = True)
