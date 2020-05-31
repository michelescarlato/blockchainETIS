function myFunctionETIS() {
  const Parameter = $('#mySelectETIS').val().split(',')[0];
  const Indicator = $('#mySelectETIS').val().split(',')[1];
  Calculate(Parameter, Indicator);
}

function myFunctionSDA() {
  const Parameter = $('#mySelectSDA').val().split(',')[0];
  const Indicator = $('#mySelectSDA').val().split(',')[1];
  const query = $('#mySelectSDA').val().split(',')[2];
  Calculate(Parameter, Indicator, query);
}

function myFunctionCRG() {
  const Parameter = $('#mySelectCRG').val().split(',')[0];
  const Indicator = $('#mySelectCRG').val().split(',')[1];
  Calculate(Parameter, Indicator);
}
