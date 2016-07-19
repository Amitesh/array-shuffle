//Installed node modules: jquery underscore request express jade shelljs passport http sys lodash async mocha chai sinon sinon-chai moment connect validator restify ejs ws co when helmet wrench brain mustache should backbone forever debug

if(_ === undefined){
    var _ = require('lodash');
}

function log(){
    
}

for (var i = 0; i < 51; i++) {
    console.log('---', i, '---');
    testSuffle();
    console.log('--- # ', i, '---');
}

// testSuffleSingleList();

function testSuffle() {
    for (var i = 0; i < 51; i++) {

        console.log('====== For :', i, ' ======');
        var items = _.range(0, i, 1); // 18

        console.log('\nitems  =>      ', items, items.length);

        var indices = getRandomiseIndexes(items);
        var randomValues = getFormattedRandomValues(items, indices);


        console.log('values =>      ', randomValues, randomValues.length);
        console.log('===================================================================\n');
    }
}

function testSuffleSingleList() {
    console.log('====== For : 0 ======');
    var items = _.range(0, 5, 1); // 18

    console.log('\nitems  =>      ', items, items.length);

    var indices = getRandomiseIndexes(items);
    var randomValues = getFormattedRandomValues(items, indices);


    console.log('values =>      ', randomValues, randomValues.length);
    console.log('===================================================================\n');

}



function getFormattedRandomValues(items, indices) {
    var out = [];
    _.forEach(indices, function(v, i) {
        out.push(items[v]);
    });
    return out;
}

function getRandomiseIndexes(items, maxLength) {

    var inputList = [];
    var finalList = []; // 18
    var afterSuffle = [];

    maxLength = maxLength || 18;

    var currLen = items.length;
    var noOfWordsToRepeat = maxLength - currLen;

    // If there is insufficient words then fill it with repeated
    if (currLen > 0 && noOfWordsToRepeat > -1) {
        var indices = [];
        _.times(_.ceil(noOfWordsToRepeat / currLen), function(n) {
            indices.push(_.range(0, currLen, 1));
        });

        indices = _.flattenDeep(indices);

        if (currLen > 1) {
            indices = indices.splice(0, noOfWordsToRepeat);
            indices = _.flattenDeep([_.range(0, items.length), indices]);
            indices = shuffle(indices);
            // indices = [ 3, 4, 1, 11, 5, 2, 2, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0 ];

            inputList = _.clone(indices);
            afterSuffle = inputList;
            finalList = removeAdjacentRepeatation(indices);
        } else {
            inputList = _.range(0, items.length);
            finalList.push(inputList)
            finalList.push(indices);
            finalList = _.flattenDeep(finalList);
            afterSuffle = finalList;
        }
    } else {
        inputList = _.range(0, items.length);
        afterSuffle = inputList;
        finalList = shuffle(inputList);
    }

    console.log('Input =>       ', inputList, ' size =>', inputList.length);
    console.log('afterSuffle => ', afterSuffle, ' size =>', afterSuffle.length);
    console.log('Output =>      ', finalList, ' size =>', finalList.length);

    return finalList;
}


function removeAdjacentRepeatation(a) {
    var l = a.length;
    var output = [];

    for (var i = 0; i < l; i++) {
        var v = a[i];

        var nextIndex = i + 1;
        var next = nextIndex < l ? a[nextIndex] : null;

        if (_.isNumber(next)) {
            if (v === next) {

                console.log('repeated at =>', i, ' as ', v);

                var s = _.takeRight(a, l - i - 1);
                var sUniq = _.uniq(s);

                if (sUniq.length === 1) {
                    s = _.take(a, i - 1);
                }
                console.log(a, s, v);

                s = shuffleWithoutStart(s, v);
                a = pushSuffleValues(a, s);
                output.push(v);
            } else {
                output.push(v);
            }
        } else {
            output.push(v);
        }
    }
    return output;
}

function shuffleWithoutStart(a, start) {
    console.log('shuffle a =>', a);
    a = _.shuffle(a);
    return (a.length > 1 && (start === a[0])) ? shuffleWithoutStart(a, start) : a;
}

function pushSuffleValues(org, rightArr) {
    var oo = _.clone(org, true);
    var o = oo.splice(0, oo.length - rightArr.length);
    return _.flatten([o, rightArr]);
}

/**
 * Fisher–Yates Shuffle Algorithm
 * @param  {[type]} array [description]
 * @return {[type]}       [description]
 */
function shuffle(arr) {
    // https://bost.ocks.org/mike/shuffle/
    var m = arr.length,
        t, i;

    // While there remain elements to shuffle…
    while (m) {

        // Pick a remaining element…
        i = Math.floor(Math.random() * m--);

        // And swap it with the current element.
        t = arr[m];
        arr[m] = arr[i];
        arr[i] = t;
    }

    return arr;
}