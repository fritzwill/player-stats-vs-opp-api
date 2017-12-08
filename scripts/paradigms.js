
HEIGHT = 350
WIDTH = 250


function Item(){
    this.addToDocument = function(){
        document.body.appendChild(this.item);
    }
}

function Label (){
    this.createLabel = function(text, id){
        this.item = document.createElement("p");
        this.item.setAttribute("id", id);
        this.item.innerHTML = text;
    },
    this.setText = function(text){
        this.item.innerHTML = text;
    }
}

function Button() {
    this.createButton = function(text, id){
        this.item = document.createElement("button");
        this.item.setAttribute("id", id);
        this.item.innerHTML = text;
    },
    this.addClickEventHandler = function(handler, args){
        this.item.onmouseup = function() {
            handler(args);
        };
    }
}

function Div(){
    this.createDiv = function(id){
        this.item = document.createElement("div");
        this.item.setAttribute("id", id);
    },
    this.addToDiv = function(item){
        this.item.appendChild(item.item);
    };
}

function Input(){
    this.createInput = function(id){
        this.item = document.createElement("INPUT");
        this.item.setAttribute("id", id);
        this.item.setAttribute("type", "search");
    },
    this.getText = function(){
        return this.item.value;
    };
}


