
$(document).ready( function() {
	$('.reset').click(function(event) {
		event.preventDefault();
		location.reload(true);
	});

  $('.start-quiz').click( function() {
  	$('.questions').find('form').remove();
  	quiz_app();
  });



	function quiz_app() {

		$('.questions').find('p').remove();
		$('.result').remove();
		//console.log('starting quiz');

		// random array of names to pick from in the questions below
		var names = ['Albert', 'Amy', 'Beavis', 'Boris', 'Cathy',
								 'Dean', 'Doris', 'Elvis', 'Elena', 'Finn'];


	  // function to generate a random number in a given range
	  function getRandom(first, last){
	  	return Math.floor(first) + Math.floor(Math.random() * (last-first+1));
	  }


	  // define the question object. This is what each question generating 
	  // function is going to return. The members are: 
	  //        q: question text 
	  //        c: choices (an array of values)
	  //        a: answer (a value in the set c above)
	  //  getters for each of the members is defined accordingly

	  function Question(question, choices, answer) {
	  	this.q        = question;
	  	this.c        = choices;
	  	this.a        = answer;
	  	this.correct  = 0;   // bool: 1 if answered correctly
	  	this.answered = 0;  // bool: 1 if question attempted
	  }

		Question.prototype.getQuestion = function() {	return this.q; }
		Question.prototype.getChoices  = function() { return this.c; }
		Question.prototype.getAnswer   = function() { return this.a; }
		


		function question_1() {
			// returns a question based on the series of the form:
			// 1 + 11 + 111 + 1111 + .... + 1111....11111(30 times)
			// Then the user is asked to guess the last two digits 
			// of the sum of the series

			var start = getRandom(1,4);
			var sLength = getRandom(40,50);
			var series = [];

		}


		// given an answer, generate multiple choices in the viccinity
		// of the answer. Return an array of 4 values.
		function genChoices(answer) {
			var choices = [];
			choices.push(answer + 3);
			choices.push(answer + 1);
			choices.push(answer);
			choices.push(answer + 4);
			return choices;
		}


		// picks a random element from the given array and returns it
		function randomChoice(myArr) {
			var idx = getRandom(0, myArr.length-1);
			return myArr[idx];
		}


		function question_2() {
			var c   = getRandom(2,8);
			var a   = getRandom(2,10);
			var c_t = getRandom(2,5);
			var a_t = c_t + getRandom(1,5);

			var cost = c * c_t + a * a_t;
			var n_group = c + a;

			var myQ = "The ticket prices to the theme park are " + c_t 
			          + " for each child and " + a_t + " for each adult."
			          + " A group of " + n_group + " people pay a total"
			          + " of " + cost + " for their tickets. How many"
			          + " children are in the group?";

			
			var choices = [];
			choices = genChoices(c);
			//console.log(choices);
			var retVal = new Question(myQ, choices, c);
			return retVal;
		}


		function question_3() {
			var q = getRandom(3,7);
			var dnr = getRandom(2,8);
			var numr = dnr * q;
			var diff = numr - dnr;

			var myQ = "Quotient of two numbers is " + q + " and their"
			          + " difference is " + diff + ". What is the larger"
			          + " of the two numbers?";

			var choices = genChoices(numr);
			var retVal = new Question(myQ, choices, numr);
			return retVal;
		}


		function question_4() {
			var n_days  = getRandom(4,8);
			var n1      = getRandom(1,5);
			var incr    = getRandom(2,5);
			var nth_day = getRandom(1, n_days-1);
			var days    = ['first', 'second', 'third', 'fourth',
			               'fifth', 'sixth', 'seventh', 'eighth'];
			var day_map = {1:'first', 2:'second', 3:'third', 4:'fourth',
			               5:'fifth', 6:'sixth', 7:'seventh', 8:'eighth' };
			var foods   = ['fishballs', 'pizzzas', 'beans', 'marhmallows'];

			var name = randomChoice(names);
			var myfood = randomChoice(foods);

	    var total = 0;
	    for (var i = 0; i < n_days; i++) {
	    	total += n1 + i * incr;
	    }

	    var myQ = name + " has eaten " + total + " " + myfood + 
	              " in " + n_days + " days. Every day, " + name + 
	              " ate " + incr + " more " + myfood + " than the" +
	              " previous day. How many did " + name + " eat on the " + 
	              day_map[nth_day] + "?"

	    var answer = n1 + (nth_day-1) * incr;
	    var choices = genChoices(answer);
	    var retVal = new Question(myQ, choices, answer);
	    return retVal;
		}

		function question_5() {
			var x = [2,4,5];
			var prod = 1;
			var mychoice = '';
			var prodString = '';
			for (var i = 0; i < getRandom(5,8); i++) {
				if (i != 0) {
					prodString += ' x ';
				}
				mychoice = randomChoice(x);
				prodString += mychoice;
				//console.log(prodString);
				prod *= mychoice;
			}

			var myQ = "What is the value of the product " + prodString + "?"

			var answer = prod;
			var choices = genChoices(prod);
			var retVal = new Question(myQ, choices, answer);
			return retVal;
		}


		function question_6() {
			var g_num = getRandom(1, 4);
			var f_num = getRandom(15, 20);
			var g_map = {1 : 'first', 2: 'second', 3: 'third', 4: 'fourth'};
			var f_map = {15: 'fifteenth', 16: 'sixteenth', 17: 'seventeenth', 
		               18: 'eighteenth', 19: 'nineteenth', 20: 'twentieth'};

			var myQ = "Gregor is the " + g_map[g_num] + " person standing in line " 
			          + "His friend is the " + f_map[f_num] + " person standing in line."
			          + " How many people are there betweeen Gregor and his friend?" 

			var answer = f_num - g_num - 1;
			var choices = genChoices(answer);
			var retVal = new Question(myQ, choices, answer);
			return retVal;
		}


		function question_7() {
			var nums = [getRandom(3,6), getRandom(5,8), getRandom(4,7), getRandom(6,9)];
			var n1 = randomChoice([1,2,3]);

		}


		function question_8() {
			var n1 = getRandom(100,200);
			var n2 = getRandom(200,300);
			var n3 = getRandom(300,400);

			var answer = (n1 + n2 + n3) * 10;
			var prodString = "10 x " + n1 + " + 10 x " + n2 + " + 10 x " + n3;
			var myQ = "Evaluate: " + prodString 

			var choices = genChoices(answer);
			var retVal = new Question(myQ, choices, answer);
			return retVal;
		}


    function question_9() {
    	var lastBox = getRandom(10, 19);
    	var nbox = getRandom(4,8);
    	var npencils = nbox*(nbox-1)/2  + lastBox;
    	var myQ = "Julio has " + npencils + " pencils. He puts the pencils into " + nbox
    	           + ". Each box has at least one pencil. There is a different " 
    	           + "number of pencils in each box. He puts as many pencils as he"
    	           + " can into the last box. How many pencils are in the last box?"

    	var answer = lastBox;
    	var choices = genChoices(answer);
    	var retVal = new Question(myQ, choices, answer);
    	return retVal;
    }

    function question_10() {
    	var start = getRandom(7,14);
    	var pages = getRandom(4,7);
    	var sum = start * pages + (pages) * (pages-1)/2

    	var myQ = "The sum of pages numbers of Chapeter 2 (of a certain book) is "
    	          + sum + ". If there are " + pages + " pages in Chapter 2, on what pages"
    	          + " does Chapter 2 begin?";

    	var choices = genChoices(start);
    	var retVal = new Question(myQ, choices, start);
    	return retVal;
    }


    function question_11() {
    	var num_marks = getRandom(4,6);
    	var distance  = getRandom(5,10);
    	var length = distance * (num_marks - 1);
    	var diff = 100 - length;
    	var num_map = {1: 'first', 2: 'second', 3: 'third', 4: 'fourth', 5: 'fifth'};

    	var start = getRandom(1, diff);
    	var last  = start + length;
    	var guess = getRandom(2, num_marks-1);

    	var myQ = "There are " + num_marks + " marks evenly spaced from each other "
    	          + "along a meter stick. The first mark is at " + start + " cm. The"
    	          + " last mark is at " + last + " cm. Where, in centimeteres, is the "
    	          + num_map[guess] + " mark?";

    	var answer = start + distance * (guess-1);
    	var choices = genChoices(answer);
    	var retVal = new Question(myQ, choices, answer);
    	return retVal;
    }


    function question_12() {
    	var myArr = [];
    	var answer = 0;
    	for (var i = 0; i < 36; i++) {
    		myArr.push(getRandom(3,5));
    	}
    	var myNumString = "";
    	for ( var i = 0; i < 36; i++) {
    		if (i != 0 && i % 6 == 0) {
    			myNumString += "\n";
    		}
    		answer += myArr[i];
    		myNumString += myArr[i];
    		myNumString += " ";
 				//console.log(myNumString);
    	}

    	var myQ = "What is the sum of the digits in the arrangement below? "
    	          + "\n" + myNumString ;
    	
    	var choices = genChoices(answer);
    	var retVal = new Question(myQ, choices, answer);
    	return retVal;
    }


		// this array stores all the question generating functions 
		// an array of function pointers
		var quesGenArray = [question_2, question_3, question_4, question_5, question_6,
		                    question_8, question_9, question_10, question_11, question_12];

		// MAX number of questions to generate
		var numQuestions = 20; 
		// store all the generated questions in this array 
		var questionArray = []; 


		// ===============================================
		// ==================   VIEW   ===================
		// ===============================================

	  // Generates all the questions for the quiz. Picks a random
	  // question and updates the DOM. 
	  function createQuestions() {
	  	//console.log("creating questions");
			for (var i = 0; i < numQuestions; i++) {
				// pick a random question from the pool
				var myQuestion   = randomChoice(quesGenArray)();
				questionArray.push(myQuestion);
				var radioButtons = genRadioButtons(myQuestion.getChoices(), i);
				var submitHtml   = '<button type="submit" class="next">Next</button></form>' ;

				var quesHtml     = '<form id="' + i + '" class="center-text"><p>Question '
			                    + (i + 1) + ' of ' + numQuestions + '</p><h3 class="question">' 
			                    + myQuestion.getQuestion() + '</h3>' ;

			  $('.questions').append(quesHtml + radioButtons + submitHtml);
			}

		
			// now display only the first question and hide all others
			for (var i = numQuestions -1; i > 0; i--) {
				$('#' + i).hide();
			}
		}



		// generate the HTML for the radioButtons. The function gets passed the
		// answer choices and the question number, and returns the HTML as a string.
		function genRadioButtons(choices, idx) {
			buttonHtml = "";
			for (var i = 0; i < choices.length; i++) {
				buttonHtml += '<label id="radioButtons"><input type="radio" name="' + idx + '" value="' +
				              + choices[i] + '">' + choices[i] + '</label>';
			}
			return buttonHtml;
		}


		// comparator for matching the user answer against the correct answer
		function checkAnswer(answer, idx, questionArray) {
			if ( answer == questionArray[idx].getAnswer() ) {
				questionArray[idx].correct = 1;
			}
			questionArray[idx].answered = 1;
		}


		// now create the view
		createQuestions();




		// ==========================================================
		// ===================    CONTROLLER    =====================
		// ==========================================================

		// This part of the code cycles through all the questions after the 'next'
		// button is clicked. It then goes to check if the answer was correct and
		// update the appropiate data structures to keep the score. Once all questions
		// are answered, it generates the final report on the incorrect questions.



		$(".next").click( function(event) {
			event.preventDefault();
			var qNum = $(this).closest('form').attr('id');
			// get the value of the user clicked radio button
			var userChoice = $('input[name=' + qNum + ']:radio:checked').val();
			checkAnswer(userChoice, qNum, questionArray);

			if (qNum < numQuestions-1) {
				$('#' + qNum).hide();
				$('#' + qNum).next().show();
			} else if (qNum == numQuestions-1) {
				//console.log('qNum=' + qNum + " numQuestions=" + numQuestions);
				$('.questions').find("form").remove();
				$('.questions').append('<h3 class="result"></h3>');
				createResultReport();

			} else {
				return false;
			}
		});

		function createResultReport() {
			// calculate number of correct answers
			var correct = 0;
			var attempted = 0;
			for (var i = 0; i < questionArray.length; i++) {
				correct   += questionArray[i].correct;
				attempted += questionArray[i].answered;
			}

			//console.log("correct: " + correct);

			$('.result').text('You answered ' + correct + ' questions correctly out of ' + numQuestions);

			for (var i = 0; i < questionArray.length; i++) {
				if (questionArray[i].correct == 0) {
					$('.questions').append('<p class="incorrect-' + i + '">You missed:  '
						                      + questionArray[i].getQuestion() + '   Answer: ' 
						                      + questionArray[i].getAnswer() + '</p>');
					//console.log("You missed: ");
					//console.log(questionArray[i].getQuestion() );
				}
			}
		}

    // install a controller for the 'start' button. We want to handle the
    // case where the 'start' is pressed in the middle of the quiz.
	}

});
