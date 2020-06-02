function myFunctionETIS() {
  const Parameter = $('#mySelectETIS').val().split(',')[0];
  const Indicator = $('#mySelectETIS').val().split(',')[1];
  const querySortByCount = $('#mySelectETIS').val().split(',')[2];
  console.log(querySortByCount)
  Calculate(Parameter, Indicator, querySortByCount);
}

function myFunctionSDA() {
  const Parameter = $('#mySelectSDA').val().split(',')[0];
  const Indicator = $('#mySelectSDA').val().split(',')[1];
  const querySortByCount = $('#mySelectSDA').val().split(',')[2];
  console.log(querySortByCount)
  Calculate(Parameter, Indicator, querySortByCount);
}

function myFunctionCRG() {
  const Parameter = $('#mySelectCRG').val().split(',')[0];
  const Indicator = $('#mySelectCRG').val().split(',')[1];
  const querySortByCount = $('#mySelectCRG').val().split(',')[2];
  console.log(querySortByCount)
  Calculate(Parameter, Indicator, querySortByCount);
}
