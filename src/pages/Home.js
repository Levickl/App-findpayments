import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, BackHandler, Alert } from 'react-native';

export default function Home({ route }) {

  const [form, setForm] = useState({
    id: '',
    username: '',
    name: '',
    email: '',
    role: '',
    division: '',
    company: ''
  })


  const getData = () => {
    const { user } = route.params;

    setForm({
      id: user.id,
      username: user.username,
      name: user.full_name,
      email: user.email,
      role: user.role,
      division: user.division,
      company: user.company
    })
  }



  useEffect(() => {
    getData();
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
  }, []);

  const showAlert = () => {
    Alert.alert(
      'Sair do aplicativo',
      'Você tem certeza de que deseja sair?',
      [
        { text: 'Cancelar', },
        { text: 'Confirmar', onPress: () => BackHandler.exitApp() },
      ],
      { cancelable: false }
    );
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.textTitle}>Seja bem vindo/a {form.username}!</Text>
    </View>


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  textTitle: {
    color: '#515151',
    textAlign: 'center',
    fontFamily: 'Arial',
    fontSize: 38,
    fontWeight: '700',
    lineHeight: 100,
    marginBottom: 80,
  },
});
