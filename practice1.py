#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Mon Feb 12 14:02:28 2018

@author: Zhoukx.joseph
"""
from flask import Flask, render_template, request, json, session, jsonify, redirect
app = Flask(__name__)
app.secret_key='the_secrete_key_which!.di!345'
@app.route('/')
def index():
    if 'username' not in session:
        session['username']=[]
    return render_template("index.html")

@app.route('/todo/create', methods=['POST'])
def createItem():
    if request.method == 'POST':
        newItem = request.form['myInput']
        session['username'].append(newItem)
        return jsonify({ 'result' : 'success'})
    else:
        return 'error'
    # return redirect('/')

@app.route('/todo/read')
def fetchItems():
    return jsonify(session['username'])

# @app.route('/todo/update', methods=['PUT'])
# def updateItems():
#     pass
#
@app.route('/todo/delete', methods=['DETELE'])
def deteleItem():
    pass

if __name__ == '__main__':
    app.run(debug=True)
