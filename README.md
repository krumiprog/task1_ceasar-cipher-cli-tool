# task1_ceasar-cipher-cli-tool

**CLI принимает 4 опции:**

1. -s, --shift: (смещение - положительное или отрицательное целое число)
2. -a, --action: (действие - кодирование (**encode**) / декодирование (**decode**))
3. -i, --input: (файл для чтения)
4. -o, --output: (файл для записи)

**Пояснения**

1. Если не передан аргумент с путем до файла на чтение, то чтение осуществляется из process.stdin (консоль по-умолчанию).
2. Если не передан аргумент с путем до файла на запись, то вывод осуществляется в process.stdout (консоль по-умолчанию).
3. Шифруются/дешифруются только латинские буквы, регистр сохраняется, остальные символы не изменяются.
4. Если текст вводится из консоли, то программа не завершается после выполнения шифровки/дешифровки введенного текста, для прекращения работы `Ctrl + C` .
5. Поддерживаются значения shift (-s, --shift) большие, чем длина алфавита (в этом случае алфавит проходится циклически).
6. Поддерживаются отрицательные значения shift (-s, --shift) (в этом случае сдвиг осуществляться в обратную сторону).

## Пример использования

```bash
$ node my_caesar_cli -a encode -s 7 -i "./input.txt" -o "./output.txt"
```

Пример передачи отрицательного значение в параметр shift (`-s=-7`)

```bash
$ node my_caesar_cli -a encode -s=-7 -i "./input.txt" -o "./output.txt"
```
