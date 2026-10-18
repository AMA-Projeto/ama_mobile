# AMA — Assistência e Mobilização Animal

Aplicativo mobile desenvolvido como Projeto Integrador para apoiar a divulgação de casos de animais que precisam de ajuda e facilitar a mobilização de pessoas dispostas a colaborar.

## Objetivo

O AMA busca aproximar pessoas que identificam animais em situação de necessidade de pessoas que possam ajudar, reunindo informações do caso em uma interface mobile.

## Funcionalidades implementadas

- Cadastro e login de usuários.
- Tela inicial com listagem de casos de animais.
- Visualização dos detalhes de um caso, incluindo fotos, localização, status, características, descrição e responsável pela publicação.
- Cadastro e publicação de novos casos.
- Seleção de imagens para anexar ao caso.
- Ação para demonstrar interesse em ajudar.
- Exibição da foto de perfil do usuário quando disponível.

> **Observação:** a disponibilidade e o comportamento de algumas ações podem depender da integração implementada no código atual. Este README não pressupõe que exista um backend ou persistência remota de dados.

## Tecnologias e ferramentas

- **React Native** — construção da interface mobile.
- **Expo** — execução e desenvolvimento do aplicativo.
- **TypeScript** — tipagem do código.
- **Lucide React Native** — ícones.
- **React Native Safe Area Context** — tratamento das áreas seguras do dispositivo.
- **Expo Image Picker** — seleção de imagens da galeria.
- **Git e GitHub** — controle de versão e colaboração.
- **Visual Studio Code** — editor de código recomendado para o projeto.

## Requisitos

Antes de iniciar, instale:

- Node.js em uma versão compatível com a versão do Expo utilizada no projeto.
- npm (incluído com o Node.js).
- Expo Go em um celular Android/iOS ou Android Studio com um emulador Android configurado.

## Como executar localmente

1. Clone o repositório:

   ```bash
   git clone https://github.com/AMA-Projeto/ama_mobile.git
   ```

2. Entre na pasta do projeto:

   ```bash
   cd ama_mobile
   ```

3. Instale as dependências:

   ```bash
   npm install
   ```

4. Inicie o Expo:

   ```bash
   npx expo start
   ```

5. Para abrir o aplicativo:
   - **Celular:** escaneie o QR code com o Expo Go, conforme as instruções exibidas no terminal.
   - **Emulador Android:** com o emulador aberto, pressione `a` no terminal do Expo.

Se houver problemas com o cache do Metro, tente iniciar com:

```bash
npx expo start --clear
```

## Verificação de tipos

Para verificar erros de TypeScript, execute na pasta do projeto:

```bash
npx tsc --noEmit
```

## Estrutura principal

```text
ama_mobile/
├── App.tsx
├── src/
│   ├── components/
│   │   ├── layout/
│   │   └── ui/
│   ├── data/
│   ├── screens/
│   └── theme/
├── package.json
└── README.md
```

- `App.tsx`: ponto de entrada e coordenação das telas.
- `src/screens/`: telas principais do aplicativo.
- `src/components/`: componentes reutilizáveis de interface e layout.
- `src/data/`: modelos e dados dos casos.
- `src/theme/`: cores, espaçamentos e tipografia.

## Fluxo de trabalho com Git

O projeto utiliza branches para organizar o desenvolvimento. Antes de começar uma tarefa, atualize sua branch de trabalho. Faça commits com mensagens que descrevam a alteração e envie a branch ao GitHub.

Exemplos de mensagens de commit:

```text
feat: add animal case form
fix: refine case details screen layout
docs: add project README
```

## Equipe e colaboração

O repositório é compartilhado entre os integrantes do Projeto Integrador. Combine com a equipe antes de realizar alterações diretamente nas branches principais, especialmente `develop` e `main`.

## Status do projeto

Projeto acadêmico em desenvolvimento. As funcionalidades e integrações podem ser ampliadas conforme as próximas etapas do Projeto Integrador.