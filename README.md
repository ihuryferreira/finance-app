# **📱 Personal Finance**

Aplicativo desenvolvido com **Expo** e **React Native** para controle de finanças pessoais. Permite adicionar receitas, editar transações existentes, excluir transações e visualizar todas as movimentações salvas no dispositivo.

## **🚀 Funcionalidades**

* **Tela inicial de login simples**: Usuário informa seu nome apenas na primeira vez.  
* **Página Home**:  
  * Exibe logo, nome do usuário e saldo atual.  
  * Botão para Adicionar Receita.  
  * Lista de transações recentes.  
* **Detalhes da Transação**: Ao clicar em uma transação, exibe:  
  * ID, Nome, Valor e Data.  
  * Botões de Editar e Excluir.  
* **Navegação por Tabs**:  
  * **Início**: Tela principal com saldo e últimas transações.  
  * **Transações**: Lista completa salva no AsyncStorage.  
* **Persistência**: Uso de AsyncStorage para manter os dados localmente.  
* **Interface**: StatusBar configurada para melhor experiência visual.

## **🛠️ Estrutura do Projeto**

### **app/\_layout.tsx**

* Configuração principal da navegação.  
* Inclui o TransactionsProvider para disponibilizar os dados em todo o app.  
* Define o Stack e as Tabs.

### **contexts/TransactionsContext.tsx**

* Contexto global para gerenciar transações.  
* **Funções disponíveis**: getLastTransactions, findTransactionById, addTransaction, updateTransaction e deleteTransaction.

### **components/**

* Button: Componente reutilizável para botões.  
* TransactionListItem: Item da lista de transações.  
* TransactionsModal: Modal para adicionar/editar transações.

### **hooks/**

* Hooks criados para acessar de forma segura e prática os dados do contexto.  
* Funcionam como "atalhos inteligentes" para manipular o estado global.

## **📦 Tecnologias Utilizadas**

* **Core:** [React Native](https://reactnative.dev/) (v0.81) & [Expo](https://expo.dev/) (SDK 54\)  
* **Navegação:** [Expo Router](https://docs.expo.dev/router/introduction/) com suporte a Tabs e Native Stack.  
* **Gerenciamento de Estado:** Context API com Custom Hooks para persistência de dados.  
* **Armazenamento:** [AsyncStorage](https://react-native-async-storage.github.io/async-storage/) para dados das transações e [SecureStore](https://docs.expo.dev/versions/latest/sdk/securestore/) para dados sensíveis.  
* **Interface e UX:**  
  * **Animações:** [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/) para transições fluidas.  
  * **Feedback Tátil:** [Expo Haptics](https://docs.expo.dev/versions/latest/sdk/haptics/) (vibração ao interagir com o app).  
  * **Ícones:** Expo Vector Icons (@expo/vector-icons).  
* **Linguagem:** TypeScript para tipagem estática e segurança do código.

## **▶️ Como rodar o projeto**

1. **Clone este repositório**:  
   Bash  
   git clone <https://github.com/seuusuario/finance-app.git>

2. **Instale as dependências**:  
   Bash  
   npm install

3. **Inicie o projeto**:  
   Bash  
   npx expo start

   *Escaneie o QR Code com o aplicativo Expo Go ou rode em um emulador Android/iOS.*

## **📱 Build**

* **Para gerar APK localmente**:  
  Bash  
  eas build \-p android \--profile preview \--local

* **Para gerar AAB (Play Store)**:  
  Bash  
  eas build \-p android \--profile production

## **✨ Diferenciais**

* **Persistência local**: Dados mantidos mesmo após fechar o app.  
* **Estado Global**: Uso de Context API garantindo consistência em todas as telas.  
* **Arquitetura**: Organização limpa com hooks e componentes reutilizáveis.

## Autor

Desenvolvido por **Ihury Ferreira**  
GitHub: [@ihuryferreira](https://github.com/ihuryferreira)
