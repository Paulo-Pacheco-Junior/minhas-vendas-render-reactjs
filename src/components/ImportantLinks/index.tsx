import { Container, LinkButton } from "./styles";

export function ImportantLinks() {
  return (
    <Container>
      <div>
        <LinkButton to="https://oiatende.local.srv.br/" target="_blank">
          Oi Conecta
        </LinkButton>
        <LinkButton to="https://passaporte.oi.intranet/" target="_blank">
          Oi 360
        </LinkButton>
      </div>
      <div>
        <LinkButton
          to="https://geosite.local.srv.br/cobertura-ftth/"
          target="_blank"
        >
          Geosite
        </LinkButton>
        <LinkButton
          to="https://geosite.local.srv.br/cobertura-ftth-simplificado/"
          target="_blank"
        >
          Geosite Simplificado
        </LinkButton>
      </div>
      <div>
        <LinkButton to="https://tahto.desk.blip.ai" target="_blank">
          Blip
        </LinkButton>
        <LinkButton to="http://gip.brasiltelecom.com.br" target="_blank">
          GIP
        </LinkButton>
      </div>
      <div>
        <LinkButton to="https://wfmtahto.neosyx.com/login/" target="_blank">
          WFM Tahto
        </LinkButton>
        <LinkButton to="https://ahtlas.tahto.net.br/login" target="_blank">
          Ahtlas
        </LinkButton>
      </div>
      <div>
        <LinkButton to="http://gente.oi.net.br" target="_blank">
          Gente Oi - Folha Ponto
        </LinkButton>
        <LinkButton to="https://guilda.tahto.net.br" target="_blank">
          Guilda
        </LinkButton>
      </div>
      <div>
        <LinkButton to="https://m365.cloud.microsoft/" target="_blank">
          Outlook
        </LinkButton>
      </div>
      <div>
        <LinkButton to="https://www.oi.com.br/negociacao/" target="_blank">
          Oi Negocia
        </LinkButton>
        <LinkButton to="https://www.oi.com.br" target="_blank">
          Site da Oi - Planos
        </LinkButton>
      </div>
    </Container>
  );
}
