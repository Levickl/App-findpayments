import React, { useState, useEffect } from 'react';
import { StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { View, Text, ScrollView, FlatList } from 'react-native';

const DemonstrativoScreen = ({ route }) => {
  const { demonstrativo } = route.params;

  return (
    <ScrollView style={styles.container}>

      {
        demonstrativo ?
          demonstrativo.map((filteredItem, index) => (
            <View key={index} style={styles.modalContainer}>
              <>
                <View style={styles.employeeInfoContainer}>
                  <Text style={styles.sectionTitle}>Informações do Funcionário</Text>
                  <View style={styles.infoItem}>
                    <Text style={styles.infoLabel}>Nome:</Text>
                    <Text style={styles.infoText}>{filteredItem.worker.name}</Text>
                  </View>
                  <View style={styles.infoItem}>
                    <Text style={styles.infoLabel}>Função:</Text>
                    <Text style={styles.infoText}>{filteredItem.worker.role}</Text>
                  </View>
                  <View style={styles.infoItem}>
                    <Text style={styles.infoLabel}>Divisão:</Text>
                    <Text style={styles.infoText}>{filteredItem.worker.division}</Text>
                  </View>
                </View>

                <View style={styles.companyInfoContainer}>
                  <Text style={styles.sectionTitle}>Informações da Empresa</Text>
                  <View style={styles.infoItem}>
                    <Text style={styles.infoLabel}>Endereço:</Text>
                    <Text style={styles.infoText}>
                      {filteredItem.company_address.street}, {filteredItem.company_address?.house_number} - {filteredItem.company_address?.district}
                    </Text>
                  </View>
                  <View style={styles.infoItem}>
                    <Text style={styles.infoLabel}>CNPJ:</Text>
                    <Text style={styles.infoText}>{filteredItem.company?.CNPJ}</Text>
                  </View>
                  <View style={styles.infoItem}>
                    <Text style={styles.infoLabel}>Mês Referente:</Text>
                    <Text style={styles.infoText}>{filteredItem.competence}</Text>
                  </View>
                </View>

                <View style={styles.tableHeader}>
                  <Text style={styles.tableHeaderText}>Descrição</Text>
                  <Text style={styles.tableHeaderText}>Proventos</Text>
                  <Text style={styles.tableHeaderText}>Descontos</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, borderColor: 'black', padding: 8 }}>
                  <Text style={{ color: 'black'}}>SALÁRIO BASE</Text>
                  <Text style={{ color: 'black'}}>R$ {filteredItem.data.base_salary}</Text>
                  <Text style={{ color: 'black'}}>R$ 0.00</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, borderColor: 'black', padding: 8 }}>
                  <Text style={{ color: 'black'}}>BONIFICAÇÕES</Text>
                  <Text style={{ color: 'black'}}>R$ {filteredItem.data.bonus}</Text>
                  <Text style={{ color: 'black'}}>R$ 0.00</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, borderColor: 'black', padding: 8 }}>
                  <Text style={{ color: 'black'}}>BENEFÍCIOS</Text>
                  <Text style={{ color: 'black'}}>R$ {filteredItem.data.benefits}</Text>
                  <Text style={{ color: 'black'}}>R$ 0.00</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, borderColor: 'black', padding: 8 }}>
                  <Text style={{ color: 'black'}}>FÉRIAS</Text>
                  <Text style={{ color: 'black'}}>R$ {filteredItem.data.vacation}</Text>
                  <Text style={{ color: 'black'}}>R$ 0.00</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, borderColor: 'black', padding: 8 }}>
                  <Text style={{ color: 'black'}}>INCIDENTES</Text>
                  <Text style={{ color: 'black'}}>R$ 0.00</Text>
                  <Text style={{ color: 'black'}}>R$ {filteredItem.total.discounts}</Text>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
                  <Text style={{ color: 'black', fontWeight: 'bold' }}>Descontos:</Text>
                  <Text style={{ color: 'black' }}>R$ {filteredItem.total.discounts}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
                  <Text style={{ color: 'black', fontWeight: 'bold' }}>Salário Bruto:</Text>
                  <Text style={{ color: 'black' }}>R$ {filteredItem.total.gross_salary}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
                  <Text style={{ color: 'black', fontWeight: 'bold' }}>Salário Líquido:</Text>
                  <Text style={{ color: 'black' }}>R$ {filteredItem.total.net_salary}</Text>
                </View>
              </>
            </View>


          ))
          :
          <>
            <Text>Sem Demonstrativo</Text>
          </>
      }



    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 8,
  },
  picker: {
    color: 'black',
    backgroundColor: 'white',
    borderColor: 'gray',
    borderWidth: 1,
    width: 200,
    height: 45,
    fontSize: 20,
    borderRadius: 10,
    marginBottom: 5,
  },
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  employeeInfoContainer: {
    marginBottom: 16,
  },
  companyInfoContainer: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  infoItem: {
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  infoText: {
    fontSize: 16,
    color: 'black',
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: 'black',
    padding: 8,
    fontWeight: 'bold',
  },
  tableHeaderText: {
    fontSize: 16,
    color: 'black',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: 'black',
    padding: 8,
  },
  rowText: {
    fontSize: 16,
    color: 'black',
  },
});

export default DemonstrativoScreen;
