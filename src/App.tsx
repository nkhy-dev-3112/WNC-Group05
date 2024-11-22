import { Layout } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";

const App: React.FC = () => {
  return (
    <Layout>
      <Header>This is header</Header>
      <Content>This is content</Content>
      <Footer>This is footer</Footer>
    </Layout>
  );
};

export default App;
