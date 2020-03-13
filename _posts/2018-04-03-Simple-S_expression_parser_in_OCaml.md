---
layout: post
title: Simple S-Expression Parser in OCaml
date: 2019-04-03 18:00
comments: true
categories: parser compiler interpreter programming language
---

Here follows a simple parser for S-expressions into an OCaml data structure. I'm publishing it in hopes that it may be useful for someone needing a no-nonsense parser, and for myself to refer to in playing with programming languages.

It's a modified port of a simple parser written by Jesper Oskarsson in and for his language [Reuse](https://github.com/redien/reuse-lang).

## Examples
```
'I am a symbol with spaces'
I-am-a-symbol-without-spaces
()
```

## Source Code

```ocaml
let str = String.concat "";

type token =
  | SymbolToken of string
  | ListOpening
  | ListClosing
  | EndOfTransmission

let rest : string -> string = fun s -> String.sub s 1 (String.length s - 1)

let slurp_until_end_quote_and_give_me_the_string rest_of_quoted_symbol =
  let rec inner : string -> string -> string =
    fun src_str symbol_buffer ->
    match src_str.[0] with
    | '\'' -> symbol_buffer
    | _ ->
       inner (rest src_str)
         (str [symbol_buffer; String.make 1 src_str.[0]])
  in
  inner rest_of_quoted_symbol ""

let slurp_until_symbol_end : string -> string =
  fun src ->
  let rec iter src acc =
    if String.length src == 0 then acc
    else
      match src.[0] with
      | ' ' | '\n' | '\t' | '(' | ')' -> acc
      | _ -> iter (rest src) (acc ^ String.make 1 src.[0])
  in
  iter src ""

let tokenize : string -> token list =
  fun src ->
  let rec tokenize_iter4 : string -> token list -> token list =
    fun src acc ->
    if String.length src == 0 then EndOfTransmission :: acc
    else
      match src.[0] with
      | ' ' | '\n' -> tokenize_iter4 (rest src) acc (* just skip one *)
      | '\'' ->
         let symbol =
           slurp_until_end_quote_and_give_me_the_string (rest src)
         in
         let symbol_length = String.length symbol + 2 in
         let src_with_symbol_cut_off =
           String.sub src symbol_length
             (String.length src - symbol_length (* - 2 *))
         in
         SymbolToken symbol :: tokenize_iter4 src_with_symbol_cut_off acc
      | '(' -> ListOpening :: tokenize_iter4 (rest src) acc
      | ')' -> ListClosing :: tokenize_iter4 (rest src) acc
      | _ ->
         let symbol = slurp_until_symbol_end src in
         let symbol_length = String.length symbol in
         let src_with_symbol_cut_off =
           String.sub src symbol_length (String.length src - symbol_length)
         in
         SymbolToken symbol :: tokenize_iter4 src_with_symbol_cut_off acc
  in
  tokenize_iter4 src []
;;[ tokenize "('a cool cat' b)"
  ; tokenize "'hello there'"
  ; tokenize ""
  ; tokenize " "
  ; tokenize "a"
  ; tokenize "a "
  ; tokenize "馬"
  ; tokenize "alpha beta"
  ; tokenize "a\n          b"
  ; tokenize "()"
  ; tokenize "'a cool cat'"
  ; tokenize "(App (λ aa aa) (Var bb))"
  ; tokenize "(() ((()) ()))"]

type s_expression =
  | Atom of string
  | SexpList of s_expression list

type ('i, 'e) parse_result = ParseNext of 'i * 'e | ParseOut of 'i | ParseEnd

let parse_list iterator parse_s_expressions =
  match parse_s_expressions iterator [] with next_iterator, expressions ->
    ParseNext (next_iterator, SexpList expressions)

let parse_expression (iterator: int * token list) parse_s_expressions =
  let index, tokens = iterator in
  let current_token = List.nth tokens index in
  match current_token with
  | EndOfTransmission -> ParseEnd
  | ListOpening -> parse_list (index + 1, tokens) parse_s_expressions
  | ListClosing -> ParseOut (index + 1, tokens)
  | SymbolToken s -> ParseNext ((index + 1, tokens), Atom s)

let rec string_of_s_expression s_expression =
  match s_expression with
  | SexpList l ->
     let children = List.map string_of_s_expression l in
     let children_text = String.concat " " children in
     str ["("; children_text; ")"]
  | Atom s -> s

let s_expression_of_token_list : token list -> s_expression =
  fun tokens ->
  let rec parse_s_expressions (iterator: int * token list)
            (expressions: s_expression list) =
    match parse_expression iterator parse_s_expressions with
    | ParseEnd -> (iterator, List.rev expressions)
    | ParseOut iterator -> (iterator, List.rev expressions)
    | ParseNext (iterator, result) ->
       parse_s_expressions iterator (result :: expressions)
  in
  match parse_s_expressions (0, tokens) [] with
  | _, [first] -> first
  | _, first :: _throw_away ->
     failwith
       (String.concat "\n"
          [ "Top level can only contain one item. Top level is: "
          ; string_of_s_expression (SexpList (first :: _throw_away)) ])
  | _, [] -> SexpList []

;; s_expression_of_token_list (tokenize "(() ())")
;; s_expression_of_token_list (tokenize "a")
;; string_of_s_expression
     (s_expression_of_token_list (tokenize "(a b c () () (( ())))"))
;; string_of_s_expression (s_expression_of_token_list (tokenize "(() ())"))
```

### Licence
Edit: I got a kind email asking me about a licence for this code, so to clarify, you are free to share, modify, and do whatever you wish with this code. You are free to use it under the MIT licence, or whatever.

It was written when I and [Jesper Oskarsson](http://jesperoskarsson.se/) had a hack session in a Friedrichshainer cafe, so he is the one deserving of any honour. Thanks Jesper for all help with compilers :-). For any reader, when venturing into compiler-land, it's a good idea to have a friend in meatspace to discuss the topic with. Happy hacking.

```
 The MIT License (MIT)

Copyright © 2019 Martin Josefsson

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

The software is provided “as is”, without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose and noninfringement. In no event shall the authors or copyright holders be liable for any claim, damages or other liability, whether in an action of contract, tort or otherwise, arising from, out of or in connection with the software or the use or other dealings in the software.

```
