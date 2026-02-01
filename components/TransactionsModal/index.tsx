import { useState } from 'react';
import { Image, Modal, Pressable, Switch, Text, TextInput, View } from 'react-native';
import { Button } from '../Button';
import { styles } from './styles';

interface TransactionsModalProps {
  Visible: boolean;
  initialDescription?: string;
  initialAmount?: string;
  initialReferenceDate?: string;
  onClose: () => void;
  onSave: (data: { description: string; amount: number; referenceDate: Date }) => void;
}

export const TransactionsModal: React.FC<TransactionsModalProps> = ({
  Visible,
  initialDescription,
  initialAmount,
  initialReferenceDate,
  onClose,
  onSave
}) => {
  const [description, setDescription] = useState(initialDescription ?? '');
  const [amount, setAmount] = useState(initialAmount ?? '');
  const [referenceDate, setReferenceDate] = useState(initialReferenceDate ?? '');
  const [datetimeDetail, setDatetimeDetail] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // novo estado para indicar se é despesa
  const [isExpense, setIsExpense] = useState(false);

  const handleSave = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));

    const numericAmount = Number(amount);

    onSave({
      description: description,
      amount: isExpense ? -Math.abs(numericAmount) : Math.abs(numericAmount), // aplica sinal automático
      referenceDate: datetimeDetail ? new Date(referenceDate) : new Date(),
    });

    setDescription('');
    setAmount('');
    setReferenceDate('');
    setIsLoading(false);
    onClose();
  };

  return (
    <Modal visible={Visible} animationType="slide">
      <View style={styles.modalContent}>
        <Text style={styles.title}>Adicionar transação</Text>

        <Text style={{ marginBottom: 10 }}>Descrição</Text>
        <TextInput
          placeholder="Insira uma descrição..."
          style={styles.textInput}
          value={description}
          onChangeText={text => setDescription(text)}
          returnKeyType="next"
        />

        <Text style={{ marginBottom: 10 }}>Valor</Text>
        <TextInput
          placeholder="Insira um valor..."
          style={styles.textInput}
          keyboardType="numeric"
          returnKeyType="done"
          onChangeText={text => setAmount(text.replace("-", ""))} // remove "-" se usuário tentar digitar
          value={amount}
        />

        {/* Switch para indicar se é despesa */}
        <View style={{ marginVertical: 10 }}>
          <Text>O valor é uma despesa?</Text>
          <Switch
            value={isExpense}
            onValueChange={newValue => setIsExpense(newValue)}
            style={styles.switch}
          />
        </View>

        <View style={{ marginBottom: 10 }}>
          <Text>Detalhar data e hora?</Text>
          <Switch
            value={datetimeDetail}
            onValueChange={newValue => setDatetimeDetail(newValue)}
            style={styles.switch}
          />
          {datetimeDetail && (
            <TextInput
              placeholder="Informe a data e hora..."
              style={styles.textInput}
              value={referenceDate}
              onChangeText={text => setReferenceDate(text)}
            />
          )}
        </View>

        <View style={styles.buttonsContainer}>
          <Button
            title="Salvar Transação"
            loading={isLoading}
            onPress={handleSave}
          />

          <Pressable
            style={({ pressed }) => [
              styles.closeButton,
              {
                backgroundColor: pressed ? '#e74c3c' : 'transparent',
                transform: [{ scale: pressed ? 0.95 : 1 }],
              },
            ]}
            onPress={onClose}
          >
            {({ pressed }) => (
              <>
                <Image
                  source={require("../../assets/images/close.png")}
                  style={{ width: 32, height: 32, marginRight: 2, resizeMode: 'contain' }}
                />
                <Text
                  style={[
                    styles.closeButtonText,
                    { color: pressed ? '#fff' : '#000' },
                  ]}
                >
                  Fechar
                </Text>
              </>
            )}
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};
