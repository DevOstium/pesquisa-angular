import { AbstractControl } from '@angular/forms';


// Todo validator recebe como parametro um control: AbstractControl que os inputs do form
export function lowerCaseValidator( control: AbstractControl ) {

    if( control.value.trim() && !/^[a-z0-9_\-]+$/.test(control.value) ) {
   
        // retorno esse nome lowerCase
        // esse nome lowerCase é o nome que eu vou inserir no form 
        //<ap-vmessage 
            //*ngIf="signupForm.get('userName').errors?.lowerCase && (form.submitted || signupForm.get('userName').touched)"
            //text="Must be lower case">
        //</ap-vmessage>

        //Se houver erro de validação eu retorno true
        return { lowerCase: true }

    }

    // Se não houver de validação eu retorno null
    return null;
} 