# 手順

## 1. Typeを作成する
- name, fieldsプロパティ(af)を持つGraphQLObjectTypeオブジェクト
- fieldsにはプロパティ名とそのタイプを定義
<br>

## 2. Query, Mutationを作成する
### ・ Query
- typeプロパティとresolve関数を持つオブジェクト
### ・ Mutation
- type, argsプロパティと引数を取るresolve関数を持つオブジェクト
<br>

## 3. Schemaを作成する
- GraphQLSchemaオブジェクト

<br>

## 4. エンドポイントにSchemaを読み込む


<br>