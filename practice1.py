#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Mon Feb 12 14:02:28 2018

@author: Zhoukx.joseph
"""
from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')


def home():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)