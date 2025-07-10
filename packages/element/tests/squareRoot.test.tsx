const sceneElements: any[] = [];

function getSceneElements() {
  return sceneElements;
}

function addTextElementToCanvas(text: string) {
  const textElement = {
    type: 'text',
    text,
    x: 100,
    y: 100,
    id: Math.random().toString(36).substring(2),
  };
  sceneElements.push(textElement);
}

export const handlePaste = async () => {
  const text = (await navigator.clipboard.readText()).trim();
  if (text.length > 0) {
    addTextElementToCanvas(text);
  }
};

describe('Clipboard Paste - Caracteres Especiais', () => {
  it('deve colar √ como elemento de texto no canvas', async () => {
    Object.assign(navigator, {
      clipboard: {
        readText: async () => '√',
      },
    });

    await handlePaste();

    const elements = getSceneElements();
    expect(elements.some(el => el.type === 'text' && el.text === '√')).toBe(true);
  });

  it('deve colar π e ✓ como elementos de texto no canvas', async () => {
    const especiais = ['π', '✓'];
    for (const char of especiais) {
      Object.assign(navigator, {
        clipboard: {
          readText: async () => char,
        },
      });

      await handlePaste();

      const elements = getSceneElements();
      expect(elements.some(el => el.type === 'text' && el.text === char)).toBe(true);
    }
  });

  it('deve colar uma string com caracteres especiais', async () => {
    const textoCompleto = 'Área = √(a² + b²)';
    Object.assign(navigator, {
      clipboard: {
        readText: async () => textoCompleto,
      },
    });

    await handlePaste();

    const elements = getSceneElements();
    expect(elements.some(el => el.type === 'text' && el.text === textoCompleto)).toBe(true);
  });
});
