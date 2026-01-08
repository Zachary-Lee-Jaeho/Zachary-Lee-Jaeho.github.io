# Jaeho Lee - CV Website

순수 HTML과 CSS로 작성된 정적 CV 웹사이트입니다. 복잡한 빌드 과정이나 Node.js가 필요 없습니다.

## 파일 구조

- `index.html`: 웹사이트의 메인 내용이 담겨 있습니다. (CV 내용 수정 시 이 파일을 편집하세요)
- `style.css`: 웹사이트의 디자인(스타일)이 정의되어 있습니다.
- `My_CV.txt`: 원본 CV 데이터 (참고용)

## 실행 방법

### 로컬에서 보기
1. `index.html` 파일을 그냥 더블 탭해서 브라우저로 열어도 보입니다.
2. 하지만 이미지 로딩이나 최적의 환경을 위해 VS Code의 **Live Server** 확장을 사용하는 것을 추천합니다.
   - `index.html` 우클릭 -> **Open with Live Server**

### 배포 방법 (GitHub Pages 등)
- 이 폴더의 모든 파일(`index.html`, `style.css`)을 그대로 웹 호스팅 서버(public_html)나 GitHub Pages 저장소에 업로드하면 됩니다.
- 별도의 빌드 명령(`npm run build`)은 필요 없습니다.

## 수정 방법
- 텍스트 에디터(VS Code, 메모장 등)로 `index.html`을 열어서 내용을 직접 수정하시면 됩니다.
