import React, {useEffect, useState} from 'react';
import {Modal, View, Text, StyleSheet, Button} from 'react-native';
import {useTranslation} from 'react-i18next';
import {buy, getProducts, restorePurchases} from '../services/purchaseService';

type Props = {
  visible: boolean;
  productId: string;
  onClose: () => void;
  title?: string;
};

export default function PurchaseModal({visible, productId, onClose, title}: Props) {
  const {t} = useTranslation();
  const [price, setPrice] = useState<string>('');

  useEffect(() => {
    if (visible && productId) {
      getProducts([productId]).then(ps => {
        const p = ps[0];
        if (p?.localizedPrice) setPrice(p.localizedPrice);
      });
    }
  }, [visible, productId]);

  async function onBuy() {
    const ok = await buy(productId);
    if (ok) onClose();
  }

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <View style={styles.card}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{t('lockedCategory')}</Text>
          <Text style={styles.price}>{price}</Text>
          <View style={styles.row}>
            <Button title={t('cancel')} onPress={onClose} />
            <Button title={t('unlock')} onPress={onBuy} />
          </View>
          <View style={{height: 8}} />
          <Button title={t('restorePurchases')} onPress={() => restorePurchases()} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  card: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
  },
  title: {fontSize: 18, fontWeight: '700'},
  subtitle: {marginTop: 8},
  price: {marginTop: 8, fontWeight: '600'},
  row: {flexDirection: 'row', justifyContent: 'space-between', marginTop: 16},
});

