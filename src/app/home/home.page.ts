import { Component } from '@angular/core';
import { JokesService } from '../service/jokes.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private jokesService: JokesService, private alertController: AlertController) {}

  piada : any;
  piadas : any[];
  url = '/assets/indice.jpeg';
  valorInput: String;

  

  showjoke() {
    this.jokesService.getAllJokes().subscribe(piadas => {
      //this.piada = piadas[this.aleatorio(piadas)];
      this.piadas = piadas;
     // this.presentAlert();
    }, erro => {
      console.log(erro);
    }, () => {
      console.log('sucesso');
    }
    );
  }

  ngOnInit(): void{
    this.showjoke();
  }
    
  informaNome(){
    var nome = this.valorInput.toLowerCase()
    this.piadas = this.piadas.filter((item) => {
      if(item.pergunta.toLowerCase().math(nome))
      return item;   
    });      
  }

  prepareToDe(piada: any){
    this.jokesService.piadaSelecionada = piada
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: this.piada.pergunta,
      message: this.piada.resposta,
      buttons: ['OK']
    });

    await alert.present();
  }

  aleatorio(piadas: any[]) {
    return Math.floor(Math.random() * piadas.length + 1);
  }


}
