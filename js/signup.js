class validator{
  constructor(){
    this.validations = [
      'data-min-length',
      'data-max-length',
      'data-only-letters',
      'data-only-numbers',
      'data-email-validate',
      'data-required',
      'data-equal',
      'data-password-validate'

    ]
  }

  //iniciar a validação dos campos
  validate(form){

    //limpar validações antigas

    let currentValidations = document.querySelectorAll('form .error-validation');
    if(currentValidations.length){
      this.cleanValidations(currentValidations);
    }

    //pegar os inputs

    let inputs = form.getElementByTagName("input");
    
    // transformar o HTML em Arrays
    let inputsArray = [...inputs];

    //loop nos inputs para validação 
    inputsArray.forEach(function(input, obj){

      // fazer validação de acordo com o atributo do input
      for(let i = 0; this.validations.length > i; i++){
        if(input.getAttribute(this.validations[i]) !=null){

          //limpa o String para verificar o método
          let method = this.validations[i].replace('data-', '').replace('-', '');

          //valor do input
          let value = input.getAttribute(this.validations[i]);

          //chama o método
          this[method](input,value);
        }
      }

    },this);

  }

  //validação da quantidade mínima de caracteres
  minlength(input, minValue){

      let inputLength = input.value.length;
      let errorMenssage = 'O campo precisa ter pelo menos ${minValue} caracteres';

      if(inputLength < minValue){
        this.printMenssage(input, errorMenssage);
      }
  }

  //validação da quantidade máxima de caracteres
  maxlength(input, maxValue){

    let inputLength = input.value.length;
    let errorMenssage = 'O campo precisa ter menos que ${maxValue} caracteres';

    if(inputLength > maxValue){
      this.printMenssage(input, errorMenssage);
    }
  }

  //validação para somente letras
  onlyletters(input){

    let re = /^[A-Za-z]+$/;;
    let inputValue = input.value;
    let errorMenssage = 'Este campo não aceita números nem caracteres especiais';

    if(!re.test(inputValue)){
      this.printMenssage(input, errorMenssage);
    }

  }

    //validação para somente letras
    onlynumbers(input){

      let re = /[0-9]/;;
      let inputValue = input.value;
      let errorMenssage = 'Este campo não aceita letras nem caracteres especiais';
  
      if(!re.test(inputValue)){
        this.printMenssage(input, errorMenssage);
      }
  
    }

    // método para validar e-mail
    emailvalidate(input) {
      let re = /\S+@\S+\.\S+/;
  
      let email = input.value;
  
      let errorMessage = `Insira um e-mail no padrão matheus@email.com`;
  
      if(!re.test(email)) {
        this.printMessage(input, errorMessage);
      }
  
    }

      // verificar se um campo está igual o outro
  equal(input, inputName) {

    let inputToCompare = document.getElementsByName(inputName)[0];

    let errorMessage = `Este campo precisa estar igual ao ${inputName}`;

    if(input.value != inputToCompare.value) {
      this.printMessage(input, errorMessage);
    }
  }

    // método para exibir inputs que são necessários
    required(input) {

      let inputValue = input.value;
  
      if(inputValue === '') {
        let errorMessage = `Este campo é obrigatório`;
  
        this.printMessage(input, errorMessage);
      }
  
    }

      // validando o campo de senha
  passwordvalidate(input) {

    // explodir string em array
    let charArr = input.value.split("");

    let uppercases = 0;
    let numbers = 0;

    for(let i = 0; charArr.length > i; i++) {
      if(charArr[i] === charArr[i].toUpperCase() && isNaN(parseInt(charArr[i]))) {
        uppercases++;
      } else if(!isNaN(parseInt(charArr[i]))) {
        numbers++;
      }
    }

    if(uppercases === 0 || numbers === 0) {
      let errorMessage = `A senha precisa um caractere maiúsculo e um número`;

      this.printMessage(input, errorMessage);
    }

  }

    // método para imprimir mensagens de erro
    printMessage(input, msg) {
  
      // checa os erros presentes no input
      let errorsQty = input.parentNode.querySelector('.error-validation');
  
      // imprimir erro só se não tiver erros
      if(errorsQty === null) {
        let template = document.querySelector('.error-validation').cloneNode(true);
  
        template.textContent = msg;
    
        let inputParent = input.parentNode;
    
        template.classList.remove('template');
    
        inputParent.appendChild(template);
      }
  
    }

      // remove todas as validações para fazer a checagem novamente
  cleanValidations(validations) {
    validations.forEach(el => el.remove());
  }

}

let form = document.getElementById('register-form');
let submit = document.getElementById('btn-submit');

let validator = new Validator();

// evento de envio do form, que valida os inputs
submit.addEventListener('click', function(e) {
  e.preventDefault();

  validator.validate(form);
});



