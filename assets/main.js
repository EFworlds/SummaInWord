function sumInWord(){
    let positionThousand = ["", " тысяча ", " тысячи ", " тысяч "];
        let positionMillion = ["", " миллион", " миллиона"," миллионов"];
        let bankNotes = ["", " гривна", " гривны", " гривен" ];
        let threeDigits=["", " сто", " двести", "триста", "четыреста", "пятьсот", "шестьсот", "семьсот", "восемьсот", "девятьсот"];
        let twoDigits=["", "", "двадцать", "тридцать", "сорок", "пятьдесят", "шестьдесят", "семьдесят", "восемьдесят", "девяносто"];
        let oneDigits=["", "один", "два", "три", "четыре", "пять", "шесть", "семь", "восемь", "девять", "десять", "одиннадцать", "двенадцать", "тринадцать", "четырнадцать", "пятнадцать", "шестнадцать", "семнадцать", "восемнадцать", "девятнадцать"];
        let exceptions = ["", "одна", "две"];

        // гривна. гривны. гривен
        /*
                    одна гривна
                    две гривны
                    пять гривен
                    десять гривен
                    двадцать одна гривна
                    двадцать две гривны
                    двадцать пять гривен
                    сто гривен
                    сто одна гривна
                    сто две гривны
                    девятьсот девяносто девять гривен
                    тысяча гривен

                    сто миллионов
                    сто один миллион
                    сто два миллиона
                    сто три миллиона
                    сто пять миллионов

        */
        // 999 999 999
        //let inputNumber = "1";
        let inputNumber = (document.getElementById("inputString").value);
        let txtOutput = "";
        if(+inputNumber <=999999999 && +inputNumber > 0){
            let pattern="000000000";        

           // доводим количество цифр до шаблона
            let inputNumberPlusPattern=pattern.substring(inputNumber.length)+inputNumber;
            
            //разбиваем на элементы в массиве 
            let arr_InputNumberPlusPattern = inputNumberPlusPattern.split(''); 
            
            let txtNumberPosition = 0, flagTenPlus = false; // flagTenPlus - индикатор от 10 до 19; txtNumberPosition разряды чисел
            let position, hundreds, dozens, units;

            for (let group = 0; group < 3; group++){
                // разбиваем на группы по три. position == 0 - первый элемент группы: миллион, тысяча, сотни. position +1 - второй элемент группы и т.д.  
                position = group * 3;
                hundreds = +arr_InputNumberPlusPattern[position];
               // console.log(hundreds);
                dozens = +arr_InputNumberPlusPattern[position + 1];
                console.log(dozens);
                units = +arr_InputNumberPlusPattern[position + 2];
                //console.log(units);
                flagTenPlus = false;
                // проход по группам
                switch (position){
                    case 0:
                        if (hundreds != 0){
                            txtOutput = threeDigits[hundreds];
                        }
                        if (dozens != 0 && dozens != 1){
                            txtOutput = txtOutput + " " + twoDigits[dozens]  ;
                        }
                        if (dozens == 1){
                            txtOutput = txtOutput + " " + oneDigits[units + 10] ;
                            flagTenPlus = true;
                        }
                        if (units != 0 && dozens != 1){
                            txtOutput = txtOutput + " " +  oneDigits[units];
                        }            
                        // склоняем разряды
                        if (!flagTenPlus && units == 1){
                            txtNumberPosition = positionMillion[1];
                        }else if(!flagTenPlus && (units == 2 || units == 3 || units ==4)) {
                            txtNumberPosition = positionMillion[2];
                        }else {
                            txtNumberPosition = positionMillion[3];
                        }
                        if(dozens || hundreds || units){
                            txtOutput = txtOutput + txtNumberPosition;
                        }
                        //console.log(txtOutput);
                    break;
                    case 3:
                        if (hundreds != 0){
                            txtOutput =txtOutput +" " + threeDigits[hundreds];
                        }
                        if (dozens != 0 && dozens != 1){
                            txtOutput = txtOutput + " " + twoDigits[dozens]  ;
                        }
                        if (dozens == 1){
                            txtOutput = txtOutput + " " + oneDigits[units + 10] ;
                            flagTenPlus = true;
                        }
                        // вводим исключения: одна, две
                        if (units != 0 && dozens != 1){
                            if(units == 1){
                                txtOutput = txtOutput + " " +  exceptions[units]
                            }else if(units == 2){
                                txtOutput = txtOutput + " " +  exceptions[units]
                            }else{
                                txtOutput = txtOutput + " " +  oneDigits[units];
                            }                
                        }
                            
                        if (!flagTenPlus && units == 1){
                            txtNumberPosition = positionThousand[1];
                        }else if(!flagTenPlus && (units == 2 || units == 3 || units ==4)) {
                            txtNumberPosition = positionThousand[2];
                        }else{
                            txtNumberPosition = positionThousand[3];
                        }          
                        if(dozens || hundreds || units){
                            txtOutput = txtOutput + txtNumberPosition;
                        }
                        //console.log(txtOutput);
                    break;
                    case 6:
                        if (hundreds != 0){
                            txtOutput += threeDigits[hundreds] ;
                        }
                        if (dozens != 0 && dozens != 1){
                            txtOutput = txtOutput + " " + twoDigits[dozens]  ;
                        }
                        if (dozens == 1){
                            txtOutput = txtOutput + " " + oneDigits[units + 10] ;
                            flagTenPlus = true;
                        }
                        if (units != 0 && dozens != 1){
                            if(units == 1){
                                txtOutput = txtOutput + " " +  exceptions[units]
                            }else if(units == 2){
                                txtOutput = txtOutput + " " +  exceptions[units]
                            }else{
                                txtOutput = txtOutput + " " +  oneDigits[units];
                            }                
                        }
                    break;
                }
            }

            //console.log(!flagTenPlus);
           // console.log(units);

            //склоняем гривну
            if(!flagTenPlus && units == 1){
                txtOutput = txtOutput + bankNotes[1]
            }else if(!flagTenPlus && (units >= 2 && units <= 4)){
                txtOutput = txtOutput + bankNotes[2]
            }else{
                txtOutput = txtOutput + bankNotes[3]
            }
            console.log(txtOutput);
            //document.getElementById("spellingText").innerHTML = txtOutput;

            
            // коряво, но, кажется, работает

        }else if(+inputNumber == 0){
               // console.log("ноль гривен");
                txtOutput = "ноль гривен"
        }else{
                //console.log("неверный ввод");
                txtOutput = "неверный ввод, от 0 до 999999999"
        } 

        document.getElementById("spellingText").innerHTML = txtOutput;



}