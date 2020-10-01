function grid(){return Array.from(document.getElementsByClassName('q'));}
function gridNumeric(){
	var b=[];
	a=document.getElementsByClassName('q')
	for(var i=0;i<a.length;i++)
	{
		b.push(a[i].innerText);
	}
	for(var i=0;i<b.length;i++)
	{
		if(b[i]=="X")
			b[i]=1;
		else if(b[i]=="O")
			b[i]=0;
		else
			b[i]=-1
	}
	return b;
}

function checkWinner(p,a)
{
    if(a[0]==p && a[1]==p && a[2]==p)
        return true;
    if(a[3]==p && a[4]==p && a[5]==p)
        return true;
    if(a[6]==p && a[7]==p && a[8]==p)
        return true;
    if(a[0]==p && a[3]==p && a[6]==p)
        return true;
    if(a[1]==p && a[4]==p && a[7]==p)
        return true;
    if(a[2]==p && a[5]==p && a[8]==p)
        return true;
    if(a[0]==p && a[4]==p && a[8]==p)
        return true;
    if(a[2]==p && a[4]==p && a[6]==p)
        return true;
    else 
        return false;
}

function choiceMinMax(a,maximize,emptyChoices,curMark)
{    
    if(checkWinner(0,a)==true)
    {	
        var res={first:-10,second:-1}
        return res
    }
    if(checkWinner(1,a)==true)
    {	
        var res={first:10,second:-1}
        return res
    }
    if(emptyChoices==0)
    {	
        var res={first:0,second:-1}
        return res
    }
    
    var max={first:-10,second:-1},min={first:10,second:-1};
    for(var i=0;i<9;i++)
    {
        if(a[i]==-1)
        {
            a[i]=curMark;
            var cur=choiceMinMax(a,!maximize,emptyChoices-1,curMark^1);
            if(cur.first>=max.first)
            {
                max.first=cur.first;
                max.second=i;
            }
            if(cur.first<=min.first)
            {
                min.first=cur.first;
                min.second=i;
            }
            a[i]=-1;
        }
    }
    if(maximize==true)
        return max;
    else if(maximize==false)
        return min;
}

function opponentChoice(){
	var a=gridNumeric()
	var emptyChoices=0;
	for(var i=0;i<a.length;i++)
	{
		if(a[i]==-1)
			emptyChoices=emptyChoices+1;
	}
	var res=choiceMinMax(a,false,emptyChoices,0)
	return res.second
}

function checkForVictory(p){
	a=gridNumeric();
	var res=false;
	if(a[0]==p && a[1]==p && a[2]==p)
    {
        res=true;
        document.getElementById('q'+0).style.color='red'
        document.getElementById('q'+1).style.color='red'
        document.getElementById('q'+2).style.color='red'
    }
    if(a[3]==p && a[4]==p && a[5]==p)
    {
        res=true;
        document.getElementById('q'+3).style.color='red'
        document.getElementById('q'+4).style.color='red'
        document.getElementById('q'+5).style.color='red'
    }  
    if(a[6]==p && a[7]==p && a[8]==p)
    {
        res=true;
        document.getElementById('q'+6).style.color='red'
        document.getElementById('q'+7).style.color='red'
        document.getElementById('q'+8).style.color='red'
    }
    if(a[0]==p && a[3]==p && a[6]==p)
        {
        res=true;
        document.getElementById('q'+0).style.color='red'
        document.getElementById('q'+3).style.color='red'
        document.getElementById('q'+6).style.color='red'
    }
    if(a[1]==p && a[4]==p && a[7]==p)
        {
        res=true;
        document.getElementById('q'+1).style.color='red'
        document.getElementById('q'+4).style.color='red'
        document.getElementById('q'+7).style.color='red'
    }
    if(a[2]==p && a[5]==p && a[8]==p)
        {
        res=true;
        document.getElementById('q'+2).style.color='red'
        document.getElementById('q'+5).style.color='red'
        document.getElementById('q'+8).style.color='red'
    }
    if(a[0]==p && a[4]==p && a[8]==p)
        {
        res=true;
        document.getElementById('q'+0).style.color='red'
        document.getElementById('q'+4).style.color='red'
        document.getElementById('q'+8).style.color='red'
    }
    if(a[2]==p && a[4]==p && a[6]==p)
        {
        res=true;
        document.getElementById('q'+2).style.color='red'
        document.getElementById('q'+4).style.color='red'
        document.getElementById('q'+6).style.color='red'
    }
    
    if(res==true)
    {
    	console.log(res);
    	disableListeners();

    	return res;
    }
    else if(res==false)
    {
    	return res;
    }
}

function opponentTurn(){
	disableListeners();
	opIndex=opponentChoice();
	// opIndex=2;
	setTimeout(function(){
			document.getElementById('q'+opIndex).innerText='O';
			if(!checkForVictory(0))
				enableListeners();
	},500)
}

function clickFn(event){
	if(event.target.innerText!='')
		clickFn()
	event.target.innerText='X';
	if(!checkForVictory(1))
		opponentTurn();
}

function enableListeners(){
	a=grid()
	for(var i=0;i<a.length;i++)
	{
		a[i].addEventListener('click',clickFn);
	}
}

function disableListeners(){
	a=grid()
	for(var i=0;i<a.length;i++)
	{
		a[i].removeEventListener('click',clickFn);
	}
}

enableListeners();