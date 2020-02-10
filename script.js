// Function for autocomplete feature
// function autocomplete(inp, arr) {
//     /*the autocomplete function takes two arguments,
//     the text field element and an array of possible autocompleted values:*/
//     var currentFocus;
    
//       inp.addEventListener("input", function(e) {
//           var a, b, i, val = this.value;      
//           closeAllLists();
//           if (!val) { return false;}
//           currentFocus = -1;
  
//           a = document.createElement("DIV");
//           a.setAttribute("id", this.id + "autocomplete-list");
//           a.setAttribute("class", "autocomplete-items");
          
//           this.parentNode.appendChild(a);
        
//           for (i = 0; i < arr.length; i++) {
          
//           if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {          
              
//               b = document.createElement("DIV");          
//               b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
//               b.innerHTML += arr[i].substr(val.length);          
//               b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";          
//               b.addEventListener("click", function(e) {
//                   inp.value = this.getElementsByTagName("input")[0].value;
//                   closeAllLists();
//               });
  
//               a.appendChild(b);
//           }
//         }
//     });
  
//     /*execute a function presses a key on the keyboard:*/
//     inp.addEventListener("keydown", function(e) {
//           var x = document.getElementById(this.id + "autocomplete-list");
//           if (x) x = x.getElementsByTagName("div");
//           if (e.keyCode == 40) {
//               currentFocus++;
//               addActive(x);
//           } 
//           else if (e.keyCode == 38) {
//               currentFocus--;
//               addActive(x);
//           }
//           else if (e.keyCode == 13) {
//               e.preventDefault();
//               if (currentFocus > -1) {
//                   if (x) x[currentFocus].click();
//               }
//           }
//       });
  
//       function addActive(x) {
//           if (!x) return false;
//           removeActive(x);
//           if (currentFocus >= x.length) currentFocus = 0;
//           if (currentFocus < 0) currentFocus = (x.length - 1);
//           x[currentFocus].classList.add("autocomplete-active");
//       }
//       function removeActive(x) {
//           for (var i = 0; i < x.length; i++) {
//           x[i].classList.remove("autocomplete-active");
//           }
//       }
//       function closeAllLists(elmnt) {
//           var x = document.getElementsByClassName("autocomplete-items");
//           for (var i = 0; i < x.length; i++) {
//               if (elmnt != x[i] && elmnt != inp) {
//                   x[i].parentNode.removeChild(x[i]);
//               }
//           }
//       }
//       document.addEventListener("click", function (e) {
//           closeAllLists(e.target);
//       });
//   }
// autocomplete(document.getElementById("input"), medicine1);

function myFunction2() {
  var s = document.getElementById("input").value;
  var a = [];
  var dur_type = ["day","days","wk","wks","week","weeks","mnth","month","months"];
  var dos_type = ["mg","ml","drop","drops","spoon","spoons"];
  var med = medicine1;
  var l = s.length;
  var med1=0;
  var j=0;
  var do1,do2,y=[];

  var mn="",dos="",dtime="",dur="",dtype="",mark="";

  for(var i=0;i<s.length;i++) {
      if(s[i]=='-' || s[i]=='/' || s[i]==',' || s[i]==';' || s[i]==' ') {
          a.push(((s.slice(j,i)).trim()).toLowerCase());
          j=i+1;
      }
  }
  a.push(((s.slice(j)).trim()).toLowerCase());
  console.log(a);

  for(var i=0;i<a.length;i++) {
      if(a[i].length == 0) {
          a.splice(i,1);
          i--;
          continue;
      }
      if(a[i][0]>='0' && a[i][0]<='9') {
          var l=a[i].length;
          if(a[i][l-1]>='0' && a[i][l-1]<='9')
              continue;
          var s1=""
          for(j=0;j<a[i].length;j++) {
              if((a[i][j]>='0' && a[i][j]<='9') || a[i][j]=='.')
                  s1+=a[i][j];
              else
                  break;
          }
          var st = a[i].slice(j)
          a[i]=s1;
          a.splice(i+1,0,st);
      }
  }
  console.log(a);

  fl=0;
  for(var i=0;i<a.length;i++) {
      for(j=0;j<dur_type.length;j++) {
          if(a[i] == dur_type[j]) {
              fl=1;
              break;
          }
      }
      if(fl==1) {
          dtype = a[i];
          var bool = 0;
          bool = check_no(a[i-1]);
          if(bool == 1) {
              dur = a[i-1];
              a.splice(i-1,2);
          }
          else
              a.splice(i,1);
          break;
      }
  }
  if(fl==0)
      dtype = "-";
  console.log(a);

  fl=0;
  for(var i=a.length-1;i>=0;i--) {
      for(j=0;j<dos_type.length;j++) {
          if(a[i] == dos_type[j]) {
              fl=1;
              break;
          }
      }
      if(fl==0)
          continue;
      var st=a[i];
      y.push(a[i]);
      j=i-1;
      while(j>=0) {
          var f2=0;
          for(var k=0;k<dos_type.length;k++) {
              if(a[j]==dos_type[k]) {
                  y.push(a[j]);
                  f2=1;
                  st=a[j]+'/'+st;
                  break;
              }
          }
          if(f2==0)
              break;
          j--;
      }
      var bool = check_no(a[j]);
      if(bool==1) {
          do1=a[j];
          do2=st;
          st=a[j]+' '+st;
          a.splice(j,i-j+1);
      }
      else
          a.splice(j+1,i-j);
      dos = st;
      break;
  }
  if(fl==0)
      dos = "-";
  console.log(a);

  var fl=0
  for(var i=0;i<a.length;i++) {
      for(j=0;j<a[i].length;j++) {
          if(a[i][j] == '-') {
              fl=1;
              break;
          }
      }
      if(fl==1) {
          dtime = a[i];
          a.splice(i,1);
          break;
      }
  }
  if(fl==0) {
      for(var i=0;i<a.length-1;i++) {
          if((a[i]=='0' || a[i]=='1') && (a[i+1]=='0' || a[i+1]=='1')) {
              j=i;    
              while(j<a.length && check_no(a[j]) && (a[i]=='0' || a[i]=='1')) {
                  dtime=dtime+a[j]+'-';
                  j++;
              }
              fl=1;
              dtime = dtime.slice(0,-1);
              a.splice(i,j-i);
              break;
          }
      }
  }
  if(fl==0) {
      dtime = "-";
  }
  console.log(a);

  for(var i=0;i<a.length;i++) {
      if(check_no(a[i])) {
          if(dos=="" || dos=="-")
              dos=a[i];
          else
              dur=a[i];
          a.splice(i,1);
      }
  }

  mn = a[0];
  a.splice(0,1);
  for(var i=0;i<med.length;i++) {
      if(mn == med[i]) {
          med1=1;
          break;
      }
  }
  console.log(mn);

  j=0;
  if(a.length >= 1)
      while(j<a.length) {
          mark=mark+a[j]+' ';
          j++;
      }
  else
      mark="-";

  if(med1==1 && dos!="-")
    check_dose1(do1,y,medicine2[mn]);

  if(dur == "") {
      dur = "-";
  }
	
	var t = mn.split("_");
	var mn1="";
	for(var i=0;i<t.length;i++) {
      mn1 = mn1+" "+t[i];
  }
	mn = mn1.trim();
	console.log(mn);

  console.log(a);
  console.log(dos);
  console.log(dtime);
  console.log(dur);
  console.log(dtype);
  console.log(mark);

  document.getElementById("mn").value = mn;
  document.getElementById("dos").value = dos;
  document.getElementById("dtime").value = dtime;
  document.getElementById("dur").value = dur;
  document.getElementById("dtype").value = dtype;
  document.getElementById("mark").value = mark;
}

function check_no(n) {
  for(var i=0;i<n.length;i++) {
      if(n[i]>='0' && n[i]<='9')
          continue;
      else
          return 0;
  }
  return 1;
}

function check_dose1(d1,y,m) {
  var c=0;
  for(var i=0;i<y.length;i++) {
      var d=d1+y[i];
      for(var j=0;j<m.length;j++) {
          if(d==m[j]) {
              c=1;
              return;
          }
      }
  }
  document.getElementById("dos").style = "color:red;";
}

// Medicine Array
var medicine1 = 
[
	"olanzapine",
	"risperidone",
	"clozapine",
	"haloperidol",
	"chlorpromazine",
	"trihexyphenidyl",
	"imipramine",
	"amitriptyline",
	"flouxetine",
	"sertraline",
	"paroxetine",
	"sodium_Valproate",
	"carbamazepine",
	"lithium",
	"clonidine",
	"atomoxetine",
	"lorazepam",
	"diazepam",
	"oxazepam",
	"disulfiram",
	"naltrexone",
	"acamprosate",
	"nicotine_Gums",
	"varenicline",
	"injection_fluphenazine",
	"injection_haloperidol",
	"injection_flupenthixol",
	"injection_lorazepam",
	"injection_diazepam",
	"injection_promathazine",
	"injection_thiamine_multivitamin"
];

//Medicine Dosage Array
var medicine2 = 
{
	risperidone: ["0.25mg", "0.5mg", "1mg", "2mg", "3mg", "4mg"],
	olanzapine: ["2.5mg", "5mg", "7.5mg", "10mg", "15mg", "20mg"],
	clozapine: ["12.5mg", "25mg", "50mg", "100mg", "200mg"],
	haloperidol: ["0.5mg", "1mg", "2mg", "5mg", "10mg", "20mg"],
	chlorpromazine: ["10mg", "25mg", "50mg", "100mg", "200mg"],
	trihexyphenidyl: ["2mg"],	
	imipramine: ["10mg", "25mg", "50mg"],
	amitriptyline: ["10mg", "25mg", "50mg", "75mg", "100mg", "150mg"],
	flouxetine: ["10mg", "20mg", "40mg"],
	sertraline: ["25mg", "50mg", "100mg"],
	paroxetine: ["12.5mg", "25mg", "37.5mg", "10mg", "20mg", "30mg", "40mg"],
	sodium_Valproate: ["125mg", "250mg,500mg", "1gm"],
	carbamazepine: ["100mg", "200mg", "300mg", "400mg"],
	lithium: ["300mg", "400mg", "350mg"],
	clonidine: ["0.1mg", "0.2mg", "0.3mg"],
	atomoxetine: ["10mg", "18mg", "25mg", "60mg", "60mg", "80mg", "100mg"],
	lorazepam: ["0.5mg", "1mg", "2mg"],
	diazepam: ["2mg", "5mg", "10mg"],
	oxazepam: ["10mg", "15mg", "30mg"],
	disulfiram: ["250mg", "500mg"],
	naltrexone: ["50mg"],
	acamprosate: ["33mg"],
	nicotine_Gums: ["2mg", "4mg"],
	varenicline: ["0.5mg", "1mg"],
	injection_fluphenazine: ["12.5mg", "25mg"],
	injection_haloperidol: ["50mg", "100mg"],
	injection_flupenthixol: ["20mg", "40mg"],
	injection_lorazepam: ["2mg", "4mg"],
	injection_diazepam: ["5mg", "10mg"],
	injection_promathazine: ["12.5mg", "25mg", "50mg", "100mg"],
	injection_thiamine_multivitamin: ["100mg/ml"]
};


