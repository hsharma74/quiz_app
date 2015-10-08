
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


		// this array stores all the question generating functions 
		// an array of function pointers
		var quesGenArray = [question_2, question_3, question_4];

		// MAX number of questions to generate
		var numQuestions = 10; 
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
