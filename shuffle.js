if(_ === undefined){
    var _ = require('lodash');
}


for (var i = 0; i < 21; i++) {
    console.log('---', i, '---');
    testSuffle();
    console.log('--- # ', i, '---');
}

// testSuffleSingleList();



// export default function shuffleItems(){
//     return {
//         getFormattedShuffleValues: getFormattedShuffleValues,
//         getShuffleIndexes: getShuffleIndexes
//     }
// }

/**
 * Set the actual values as per the shuffle indices/positions of given items
 * @param  {[type]} items   [description]
 * @param  {[type]} indices [description]
 * @return {[type]}         [description]
 */
function getFormattedShuffleValues(items, indices) {
    var out = [];
    _.forEach(indices, function(v, i) {
        out.push(items[v]);
    });
    return out;
}

/**
 * Get the shuffle indices of the give length of unique items array
 * 
 * @param  {[type]} items     It is an unique items array
 * @param  {[type]} maxLength No of items in the output array
 * @return {[type]}           [description]
 */
function getShuffleIndexes(items, maxLength) {

    var inputList = [];
    var finalList = []; 
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

/**
 * Remove repeated values from each other adjacents.
 * @param  {[type]} a [description]
 * @return {[type]}   [description]
 */
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

                // If there are more same repeated values then get more 
                // different values from start of array
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

/**
 * Place the different value on start and remove duplicacy
 * @param  {[type]} a     [description]
 * @param  {[type]} start [description]
 * @return {[type]}       [description]
 *
 */
function shuffleWithoutStart(a, start) {
    // console.log('shuffle a =>', a);
    
    // Avoid infinute loop if there will be only one value in the array.
    if(_.uniq(_.clone(a, true)).length === 1){
        return a;
    }

    a = _.shuffle(a);
    return (a.length > 1 && (start === a[0])) ? shuffleWithoutStart(a, start) : a;
}

/**
 * Combine the previous and current shuffle values
 * @param  {[type]} org      [description]
 * @param  {[type]} rightArr [description]
 * @return {[type]}          [description]
 */
function pushSuffleValues(org, rightArr) {
    var oo = _.clone(org, true);
    var o  = oo.splice(0, oo.length - rightArr.length);
    return _.flatten([o, rightArr]);
}

/**
 * Fisher–Yates Shuffle Algorithm
 * 
 * https://bost.ocks.org/mike/shuffle/
 * second last 
 * 
 * @param  {[type]} array [description]
 * @return {[type]}       [description]
 */
function shuffle(arr) {
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

/**
 * A small test utility
 * @return {[type]} [description]
 */
function testSuffleSingleList() {
    console.log('====== For : 0 ======');
    var items = _.range(0, 5, 1); // 18

    console.log('\nitems  =>      ', items, items.length);

    var indices = getShuffleIndexes(items);
    var randomValues = getFormattedShuffleValues(items, indices);


    console.log('values =>      ', randomValues, randomValues.length);
    console.log('===================================================================\n');

}

/**
 * Test for the many times
 * @return {[type]} [description]
 */
function testSuffle() {
    for (var i = 0; i < 21; i++) {

        console.log('====== For :', i, ' ======');
        var items = _.range(0, i, 1); // 18

        console.log('\nitems  =>      ', items, items.length);

        var indices = getShuffleIndexes(items);
        var randomValues = getFormattedShuffleValues(items, indices);


        console.log('values =>      ', randomValues, randomValues.length);
        console.log('===================================================================\n');
    }
}