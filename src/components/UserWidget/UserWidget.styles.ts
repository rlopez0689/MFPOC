import styled from "styled-components";

export const Card = styled.section<{ $themeName: string }>`
  --accent: ${({ $themeName }) => ($themeName === "violet" ? "#7657e8" : "#147d72")};
  width: min(100%, 440px);
  box-sizing: border-box;
  padding: 28px;
  border: 1px solid #e7e4f4;
  border-radius: 20px;
  background: linear-gradient(145deg, #ffffff 0%, #f6f3ff 100%);
  box-shadow: 0 18px 48px rgba(49, 35, 102, 0.14);
  color: #211d35;
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;

  h2 { margin: 10px 0 6px; font-size: 1.55rem; letter-spacing: -0.03em; }
  p { color: #625d75; line-height: 1.55; }
`;

export const Eyebrow = styled.div`
  color: var(--accent);
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.13em;
  text-transform: uppercase;
`;

export const Avatar = styled.div`
  display: grid;
  width: 52px;
  height: 52px;
  place-items: center;
  border-radius: 16px;
  background: var(--accent);
  color: white;
  font-size: 1.1rem;
  font-weight: 800;
`;

export const Detail = styled.div`
  margin-top: 18px;
  padding-top: 15px;
  border-top: 1px solid #e7e4f4;
  color: #514b67;
  font-size: 0.88rem;
  strong { color: #211d35; }
`;

export const Notice = styled.p<{ $error?: boolean }>`
  margin: 18px 0 0;
  padding: 12px 14px;
  border-radius: 12px;
  background: ${({ $error }) => ($error ? "#fff0f0" : "#f0edff")};
  color: ${({ $error }) => ($error ? "#a32d36" : "#5141a3")} !important;
  font-size: 0.9rem;
`;
