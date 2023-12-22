import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, BackHandler, TouchableOpacity, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { FetchWorkers, getWorkerDemonstrative } from '../services/workers';
import { useNavigation } from '@react-navigation/native';


export default function Consulta({ route }) {

  const [Meses, setTipoMeses] = useState('');
  const [demonstrativo, setDemonstrativo] = useState({});
  const navigation = useNavigation();

  const [form, setForm] = useState({
    id: '',
    username: '',
    name: '',
    email: '',
    role: '',
    division: '',
    company: ''
  });

  const getData = () => {
    const { user } = route.params;
    setForm({
      id: user.id,
      username: user.username,
      name: user.name,
      email: user.email,
      role: user.role,
      division: user.division,
      company: user.company
    })
  }

  useEffect(() => {
    getData();
    // console.log(form);
    const bVoltar = () => {
      showAlert();
      return true; // Retorna true para não fechar o app ou voltar de página.
    };

    // Salvando o evento de voltar
    const backHandler = BackHandler.addEventListener('hardwareBackPress', bVoltar);

    // Limpando o evento de voltar da variável
    return () => {
      backHandler.remove();
    };
  }, [route.params]);

  //// console.log(form.name);

  const getDemonstrativo = async () => {
    try {
      if (form.id) {
        const monthNumber = mesesMap[Meses];
        // console.log('Month Number:', monthNumber);

        const { data, status } = await getWorkerDemonstrative(form.id, monthNumber);

        if (data != 0) {
          setDemonstrativo(data);
          // console.log('Demonstrativo:', data);
          navigation.navigate('Demonstrativo', { demonstrativo: data });
        } else {
          // console.log("Nenhum dado encontrado");
          Alert.alert('Demonstrativos','Não há demonstrativo no mês selecionado!', [{ text: 'Ok' }], { cancelable: false });
        }
      }
    } catch (error) {
    }
  };

  const showAlert = () => {
    Alert.alert(
      'Sair do aplicativo',
      'Você tem certeza de que deseja sair?',
      [
        { text: 'Cancelar' },
        { text: 'Confirmar', onPress: () => BackHandler.exitApp() },
      ],
      { cancelable: false }
    );
  };

  const mesesMap = {
    'Janeiro': '1',
    'Fevereiro': '2',
    'Março': '3',
    'Abril': '4',
    'Maio': '5',
    'Junho': '6',
    'Julho': '7',
    'Agosto': '8',
    'Setembro': '9',
    'Outubro': '10',
    'Novembro': '11',
    'Dezembro': '12',
  };

  const tiposMeses = ['Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Funcionário:</Text>
      <View />
      <TextInput style={styles.input}
        value={form.name}
        editable={false}
      />

      <Text style={styles.text}>Competência:</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={Meses}
          style={styles.picker}
          onValueChange={(itemValue, itemIndex) => setTipoMeses(itemValue)}
        >
          <Picker.Item label="Nenhum" value="0" />
          {tiposMeses.map((tipo, index) => (
            <Picker.Item key={index} label={tipo} value={tipo} />
          ))}
        </Picker>
      </View>

      <TouchableOpacity style={styles.botao} onPress={getDemonstrativo}>
        <View>
          <Text style={styles.btext}>Consultar</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    padding: 50,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    color: '#515151',
    textAlign: 'justify',
    fontFamily: 'Arial',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 5,
  },
  inputContainer: {
    width: 301,
    height: 45,
    borderWidth: 1,
    borderColor: 'rgba(87, 87, 87, 0.40)',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  input: {
    width: 301,
    height: 45,
    borderWidth: 1,
    borderColor: 'rgba(87, 87, 87, 0.40)',
    padding: 10,
    borderRadius: 10,
    fontSize: 18,
    marginBottom: 10,
  },
  dinput: {
    fontSize: 18,
    color: 'black',
  },
  btext: {
    color: '#FFF',
    textAlign: 'center',
    fontFamily: 'Arial',
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '700',
  },
  botao: {
    width: 200,
    height: 35,
    backgroundColor: '#EF9911',
    borderRadius: 4,
    alignContent: 'center',
    justifyContent: 'center',
    margin: 20,
    marginBottom: 70,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: 'rgba(87, 87, 87, 0.40)',
    borderRadius: 10,
    marginBottom: 10,
    overflow: 'hidden', // Para evitar que a borda do Picker seja cortada
  },
  picker: {
    color: 'black',
    width: 301,
    height: 45,
    fontSize: 18,
    borderRadius: 10,
  },
});
