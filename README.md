# Desafio - Simulador de portão eletrônico com Arduino

Neste desafio foi desenvolvido um simulador de portão eletrônico utilizando Arduino UNO, relés, botões, sensores de fim de curso e LEDs.

O objetivo foi simular o funcionamento de um portão automático, permitindo controlar sua abertura e fechamento por meio de um botão. Os sensores de fim de curso identificam quando o portão chegou totalmente aberto ou fechado, desligando o motor automaticamente.

### Funcionamento

O circuito funciona da seguinte forma:

- O botão de controle inicia a movimentação do portão.
- O relé de direção define se o portão irá abrir ou fechar.
- O relé de alimentação controla o funcionamento do motor.
- O sensor de fim de curso aberto identifica quando o portão chegou ao limite de abertura.
- O sensor de fim de curso fechado identifica quando o portão chegou ao limite de fechamento.
- Quando um dos sensores é acionado, o motor é desligado.
- Os LEDs indicam o funcionamento do sistema.

Dessa forma, o Arduino controla automaticamente o movimento do portão e impede que o motor continue funcionando depois que o portão chega ao seu limite.

### Circuito

![Simulador de portão eletrônico](./prints/portao-eletronico.png)

### Código

```cpp
int relePower = 12;
int releDirecao = 13;

int botaoControle = 2;
int fimCursoAberto = 3;
int fimCursoFechado = 4;

bool portaoAberto = false;
bool motorLigado = false;

int ledVermelho = 6;
int ledVerde = 7;

unsigned long tempoAnteriorLed = 0;
const long intervaloLed = 500;
bool estadoLed = false;

void setup() {

  pinMode(relePower, OUTPUT);
  pinMode(releDirecao, OUTPUT);

  pinMode(botaoControle, INPUT);
  pinMode(fimCursoAberto, INPUT);
  pinMode(fimCursoFechado, INPUT);

  pinMode(ledVermelho, OUTPUT);
  pinMode(ledVerde, OUTPUT);
}

void loop() {

  controlarPortao();
  piscarLeds();
}

void controlarPortao() {

  if (digitalRead(botaoControle) == HIGH && !motorLigado) {

    digitalWrite(releDirecao, portaoAberto ? LOW : HIGH);
    digitalWrite(relePower, HIGH);

    motorLigado = true;

    delay(300);
  }

  if (digitalRead(fimCursoAberto) == HIGH) {

    digitalWrite(relePower, LOW);

    motorLigado = false;
    portaoAberto = true;
  }

  if (digitalRead(fimCursoFechado) == HIGH) {

    digitalWrite(relePower, LOW);

    motorLigado = false;
    portaoAberto = false;
  }
}

void piscarLeds() {

  unsigned long agora = millis();

  if (agora - tempoAnteriorLed >= intervaloLed) {

    estadoLed = !estadoLed;

    digitalWrite(ledVermelho, estadoLed);
    digitalWrite(ledVerde, !estadoLed);

    tempoAnteriorLed = agora;
  }
}
```

### Componentes utilizados

- Arduino UNO
- Motor DC
- Módulo relé
- Botão
- Sensores de fim de curso
- LED vermelho
- LED verde
- Resistores
- Protoboard
- Jumpers# desafios_IOT
