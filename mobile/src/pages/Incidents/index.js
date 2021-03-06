import React, { useEffect, useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Text, View, Image, TouchableOpacity, FlatList } from 'react-native';

import api from '../../services/api';

import styles from './styles';
import logoImg from '../../assets/logo.png';

export default function Incidents() {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [incidets, setIncidents] = useState([]);
  const navigation = useNavigation();

  const navigateToDetail = incident => navigation.navigate('Detail', { incident });

  const loadIncidents = async () => {
    try {
      if (loading || (total > 0 && Incidents.length === total)) {
        return;
      }

      setLoading(true);

      const response = await api.get(`/incidents`, {
        params: { page }
      });

      setIncidents([...incidets, ...response.data]);
      setTotal(response.headers['x-total-count']);
      setPage(page + 1);
      setLoading(false);
    } catch (error) {
      setIncidents([]);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.incident}>
      <Text style={styles.incidentProperty}>ONG:</Text>
      <Text style={styles.incidentValue}>{item.name}</Text>

      <Text style={styles.incidentProperty}>CASO:</Text>
      <Text style={styles.incidentValue}>{item.title}</Text>

      <Text style={styles.incidentProperty}>Valor:</Text>
      <Text style={styles.incidentValue}>
        {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.value)}
      </Text>

      <TouchableOpacity style={styles.detailsButton} onPress={() => navigateToDetail(item)}>
        <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
        <Feather name="arrow-right" size={16} color="#E02041" />
      </TouchableOpacity>
    </View>
  );

  useEffect(() => {
    loadIncidents();
  }, [incidets]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} />
        <Text style={styles.headerText}>
          Total de <Text style={styles.headerTextBold}>{total} casos</Text>.
          </Text>
      </View>

      <Text style={styles.title}>Bem-vindo!</Text>
      <Text style={styles.description}>
        Escolha um dos asos abaixo e salve o dia.
          </Text>

      <FlatList
        data={incidets}
        style={styles.incidentList}
        keyExtractor={item => String(item.id)}
        // showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
        onEndReached={loadIncidents}
        onEndReachedThreshold={0.2}       
      />
    </View>
  );
}

