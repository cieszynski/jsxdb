## Modules

<dl>
<dt><a href="#module_JSxDB">JSxDB</a></dt>
<dd></dd>
</dl>

## Classes

<dl>
<dt><a href="#Parser">Parser</a></dt>
<dd></dd>
<dt><a href="#Query">Query</a></dt>
<dd></dd>
<dt><a href="#Store">Store</a></dt>
<dd></dd>
<dt><a href="#Database">Database</a></dt>
<dd></dd>
</dl>

## Typedefs

<dl>
<dt><a href="#QueryVerb">QueryVerb</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#QueryObject">QueryObject</a> : <code>Object</code></dt>
<dd></dd>
</dl>

<a name="module_JSxDB"></a>

## JSxDB
**Author**: Stephan Cieszynski  

* [JSxDB](#module_JSxDB)
    * [.databases](#module_JSxDB.databases) : <code>Promise</code>
    * [.eq(z)](#module_JSxDB.eq) ⇒ <code>IDBKeyRange</code>
    * [.le(x)](#module_JSxDB.le) ⇒ <code>IDBKeyRange</code>
    * [.lt(x)](#module_JSxDB.lt) ⇒ <code>IDBKeyRange</code>
    * [.ge(y)](#module_JSxDB.ge) ⇒ <code>IDBKeyRange</code>
    * [.gt(y)](#module_JSxDB.gt) ⇒ <code>IDBKeyRange</code>
    * [.between(x, y, [bx], [by])](#module_JSxDB.between) ⇒ <code>IDBKeyRange</code>
    * [.startsWith(s)](#module_JSxDB.startsWith) ⇒ <code>IDBKeyRange</code>
    * [.init(name, scheme)](#module_JSxDB.init) ⇒ <code>Promise</code>
    * [.open(name)](#module_JSxDB.open) ⇒ <code>Promise</code>
    * [.remove(name)](#module_JSxDB.remove) ⇒ <code>Promise</code>

<a name="module_JSxDB.databases"></a>

### JSxDB.databases : <code>Promise</code>
**Kind**: static property of [<code>JSxDB</code>](#module_JSxDB)  
<a name="module_JSxDB.eq"></a>

### JSxDB.eq(z) ⇒ <code>IDBKeyRange</code>
equal - operator (or use "=" instead)

**Kind**: static method of [<code>JSxDB</code>](#module_JSxDB)  

| Param | Type |
| --- | --- |
| z | <code>Any</code> | 

<a name="module_JSxDB.le"></a>

### JSxDB.le(x) ⇒ <code>IDBKeyRange</code>
less than or equal to - operator (or use "<=" instead)

**Kind**: static method of [<code>JSxDB</code>](#module_JSxDB)  

| Param | Type |
| --- | --- |
| x | <code>Any</code> | 

<a name="module_JSxDB.lt"></a>

### JSxDB.lt(x) ⇒ <code>IDBKeyRange</code>
less than - operator (or use "<" instead)

**Kind**: static method of [<code>JSxDB</code>](#module_JSxDB)  

| Param | Type |
| --- | --- |
| x | <code>Any</code> | 

<a name="module_JSxDB.ge"></a>

### JSxDB.ge(y) ⇒ <code>IDBKeyRange</code>
greater than or equal to - operator (or use ">=" instead)

**Kind**: static method of [<code>JSxDB</code>](#module_JSxDB)  

| Param | Type |
| --- | --- |
| y | <code>Any</code> | 

<a name="module_JSxDB.gt"></a>

### JSxDB.gt(y) ⇒ <code>IDBKeyRange</code>
greater than - operator (or use ">" instead)

**Kind**: static method of [<code>JSxDB</code>](#module_JSxDB)  

| Param | Type |
| --- | --- |
| y | <code>Any</code> | 

<a name="module_JSxDB.between"></a>

### JSxDB.between(x, y, [bx], [by]) ⇒ <code>IDBKeyRange</code>
between - operator (or use "><" instead)

**Kind**: static method of [<code>JSxDB</code>](#module_JSxDB)  

| Param | Type | Default |
| --- | --- | --- |
| x | <code>Any</code> |  | 
| y | <code>Any</code> |  | 
| [bx] | <code>Boolean</code> | <code>false</code> | 
| [by] | <code>Boolean</code> | <code>false</code> | 

<a name="module_JSxDB.startsWith"></a>

### JSxDB.startsWith(s) ⇒ <code>IDBKeyRange</code>
starts with - operator (or use ">>" instead)

**Kind**: static method of [<code>JSxDB</code>](#module_JSxDB)  

| Param | Type |
| --- | --- |
| s | <code>String</code> | 

<a name="module_JSxDB.init"></a>

### JSxDB.init(name, scheme) ⇒ <code>Promise</code>
Create and opens the database to work with

**Kind**: static method of [<code>JSxDB</code>](#module_JSxDB)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | the name of the database |
| scheme | <code>Object</code> | an Object to declare the scheme |

**Example**  
```js
const db = await JSxdb.init("test.db", {
     // singleline
     items: "@id, title",
     // multiline
     tags: `
         id,
         title,
         *items
     `
 }
);
```
<a name="module_JSxDB.open"></a>

### JSxDB.open(name) ⇒ <code>Promise</code>
Opens the database to work with

**Kind**: static method of [<code>JSxDB</code>](#module_JSxDB)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | the name of the database |

<a name="module_JSxDB.remove"></a>

### JSxDB.remove(name) ⇒ <code>Promise</code>
**Kind**: static method of [<code>JSxDB</code>](#module_JSxDB)  

| Param | Type |
| --- | --- |
| name | <code>String</code> | 

<a name="Parser"></a>

## Parser
**Kind**: global class  
<a name="Parser+build"></a>

### parser.build(obj) ⇒ <code>Promise</code>
**Kind**: instance method of [<code>Parser</code>](#Parser)  

| Param | Type |
| --- | --- |
| obj | [<code>QueryObject</code>](#QueryObject) | 

<a name="Query"></a>

## Query
**Kind**: global class  

* [Query](#Query)
    * [.reverse()](#Query+reverse) ⇒ <code>this</code>
    * [.limit(int)](#Query+limit) ⇒ <code>this</code>
    * [.query()](#Query+query) ⇒ <code>Promise</code>
    * [.remove()](#Query+remove) ⇒ <code>Promise</code>
    * [.update(obj)](#Query+update) ⇒ <code>Promise</code>
    * [.and(indexName, keyRangeParams)](#Query+and) ⇒ <code>this</code>
    * [.or(indexName, keyRangeParams)](#Query+or) ⇒ <code>this</code>

<a name="Query+reverse"></a>

### query.reverse() ⇒ <code>this</code>
**Kind**: instance method of [<code>Query</code>](#Query)  
<a name="Query+limit"></a>

### query.limit(int) ⇒ <code>this</code>
**Kind**: instance method of [<code>Query</code>](#Query)  

| Param | Type |
| --- | --- |
| int | <code>Integer</code> | 

<a name="Query+query"></a>

### query.query() ⇒ <code>Promise</code>
**Kind**: instance method of [<code>Query</code>](#Query)  
<a name="Query+remove"></a>

### query.remove() ⇒ <code>Promise</code>
**Kind**: instance method of [<code>Query</code>](#Query)  
<a name="Query+update"></a>

### query.update(obj) ⇒ <code>Promise</code>
**Kind**: instance method of [<code>Query</code>](#Query)  

| Param | Type |
| --- | --- |
| obj | <code>Object</code> | 

<a name="Query+and"></a>

### query.and(indexName, keyRangeParams) ⇒ <code>this</code>
**Kind**: instance method of [<code>Query</code>](#Query)  

| Param | Type |
| --- | --- |
| indexName | <code>String</code> | 
| keyRangeParams | <code>String</code> \| <code>IDBKeyRange</code> | 

<a name="Query+or"></a>

### query.or(indexName, keyRangeParams) ⇒ <code>this</code>
**Kind**: instance method of [<code>Query</code>](#Query)  

| Param | Type |
| --- | --- |
| indexName | <code>String</code> | 
| keyRangeParams | <code>String</code> \| <code>IDBKeyRange</code> | 

<a name="Store"></a>

## Store
**Kind**: global class  

* [Store](#Store)
    * [.autoincrement](#Store+autoincrement) : <code>Boolean</code>
    * [.indexnames](#Store+indexnames) : <code>Array.&lt;String&gt;</code>
    * [.keypath](#Store+keypath) : <code>String</code>
    * [.name](#Store+name) : <code>String</code>
    * [.abort()](#Store+abort)
    * [.add(obj, [key])](#Store+add) ⇒ <code>Promise</code>
    * [.clear()](#Store+clear) ⇒ <code>Promise</code>
    * [.commit()](#Store+commit)
    * [.count(keyOrKeyRange)](#Store+count) ⇒ <code>Promise</code>
    * [.remove(keyOrKeyRange)](#Store+remove) ⇒ <code>Promise</code>
    * [.get(keyOrKeyRange)](#Store+get) ⇒ <code>Promise</code>
    * [.getAll(keyOrKeyRange, limit)](#Store+getAll) ⇒ <code>Promise</code>
    * [.getAllKeys(keyRange, limit)](#Store+getAllKeys) ⇒ <code>Promise</code>
    * [.getAllRecords(options)](#Store+getAllRecords) ⇒ <code>Promise</code>
    * [.getKey(keyOrKeyRange)](#Store+getKey) ⇒ <code>Promise</code>
    * [.put(obj, key)](#Store+put) ⇒ <code>Promise</code>
    * [.where(indexName, keyRangeParams)](#Store+where) ⇒ [<code>Query</code>](#Query)
    * [.parse(obj)](#Store+parse) ⇒ <code>Promise</code>
    * [.ignoreCase(indexName, str, [startsWith])](#Store+ignoreCase) ⇒ <code>Promise</code>

<a name="Store+autoincrement"></a>

### store.autoincrement : <code>Boolean</code>
**Kind**: instance property of [<code>Store</code>](#Store)  
**Read only**: true  
<a name="Store+indexnames"></a>

### store.indexnames : <code>Array.&lt;String&gt;</code>
**Kind**: instance property of [<code>Store</code>](#Store)  
**Read only**: true  
<a name="Store+keypath"></a>

### store.keypath : <code>String</code>
**Kind**: instance property of [<code>Store</code>](#Store)  
**Read only**: true  
<a name="Store+name"></a>

### store.name : <code>String</code>
**Kind**: instance property of [<code>Store</code>](#Store)  
**Read only**: true  
<a name="Store+abort"></a>

### store.abort()
**Kind**: instance method of [<code>Store</code>](#Store)  
<a name="Store+add"></a>

### store.add(obj, [key]) ⇒ <code>Promise</code>
**Kind**: instance method of [<code>Store</code>](#Store)  

| Param | Type |
| --- | --- |
| obj | <code>Object</code> | 
| [key] | <code>Key</code> | 

<a name="Store+clear"></a>

### store.clear() ⇒ <code>Promise</code>
**Kind**: instance method of [<code>Store</code>](#Store)  
<a name="Store+commit"></a>

### store.commit()
**Kind**: instance method of [<code>Store</code>](#Store)  
<a name="Store+count"></a>

### store.count(keyOrKeyRange) ⇒ <code>Promise</code>
**Kind**: instance method of [<code>Store</code>](#Store)  

| Param | Type |
| --- | --- |
| keyOrKeyRange | <code>KeyOrKeyRange</code> | 

<a name="Store+remove"></a>

### store.remove(keyOrKeyRange) ⇒ <code>Promise</code>
**Kind**: instance method of [<code>Store</code>](#Store)  

| Param | Type |
| --- | --- |
| keyOrKeyRange | <code>KeyOrKeyRange</code> | 

<a name="Store+get"></a>

### store.get(keyOrKeyRange) ⇒ <code>Promise</code>
**Kind**: instance method of [<code>Store</code>](#Store)  

| Param | Type |
| --- | --- |
| keyOrKeyRange | <code>KeyOrKeyRange</code> | 

<a name="Store+getAll"></a>

### store.getAll(keyOrKeyRange, limit) ⇒ <code>Promise</code>
**Kind**: instance method of [<code>Store</code>](#Store)  

| Param | Type |
| --- | --- |
| keyOrKeyRange | <code>KeyOrKeyRange</code> | 
| limit | <code>Integer</code> | 

<a name="Store+getAllKeys"></a>

### store.getAllKeys(keyRange, limit) ⇒ <code>Promise</code>
**Kind**: instance method of [<code>Store</code>](#Store)  

| Param | Type |
| --- | --- |
| keyRange | <code>IDBKeyRange</code> | 
| limit | <code>Integer</code> | 

<a name="Store+getAllRecords"></a>

### store.getAllRecords(options) ⇒ <code>Promise</code>
**Kind**: instance method of [<code>Store</code>](#Store)  

| Param | Type |
| --- | --- |
| options | <code>Options</code> | 

<a name="Store+getKey"></a>

### store.getKey(keyOrKeyRange) ⇒ <code>Promise</code>
**Kind**: instance method of [<code>Store</code>](#Store)  

| Param | Type |
| --- | --- |
| keyOrKeyRange | <code>KeyOrKeyRange</code> | 

<a name="Store+put"></a>

### store.put(obj, key) ⇒ <code>Promise</code>
**Kind**: instance method of [<code>Store</code>](#Store)  

| Param | Type |
| --- | --- |
| obj | <code>Object</code> | 
| key | <code>Key</code> | 

<a name="Store+where"></a>

### store.where(indexName, keyRangeParams) ⇒ [<code>Query</code>](#Query)
**Kind**: instance method of [<code>Store</code>](#Store)  

| Param | Type |
| --- | --- |
| indexName | <code>String</code> | 
| keyRangeParams | <code>String</code> \| <code>IDBKeyRange</code> | 

<a name="Store+parse"></a>

### store.parse(obj) ⇒ <code>Promise</code>
**Kind**: instance method of [<code>Store</code>](#Store)  

| Param | Type |
| --- | --- |
| obj | <code>Object</code> | 

<a name="Store+ignoreCase"></a>

### store.ignoreCase(indexName, str, [startsWith]) ⇒ <code>Promise</code>
**Kind**: instance method of [<code>Store</code>](#Store)  

| Param | Type | Default |
| --- | --- | --- |
| indexName | <code>String</code> |  | 
| str | <code>String</code> |  | 
| [startsWith] | <code>Boolean</code> | <code>false</code> | 

<a name="Database"></a>

## Database
**Kind**: global class  

* [Database](#Database)
    * [.name](#Database+name) : <code>String</code>
    * [.storenames](#Database+storenames) : <code>Array.&lt;String&gt;</code>
    * [.version](#Database+version) : <code>Integer</code>
    * [.read(...storeNames)](#Database+read) ⇒ [<code>Array.&lt;Store&gt;</code>](#Store)
    * [.write(...storeNames)](#Database+write) ⇒ [<code>Array.&lt;Store&gt;</code>](#Store)
    * [.close()](#Database+close)

<a name="Database+name"></a>

### database.name : <code>String</code>
**Kind**: instance property of [<code>Database</code>](#Database)  
**Read only**: true  
<a name="Database+storenames"></a>

### database.storenames : <code>Array.&lt;String&gt;</code>
**Kind**: instance property of [<code>Database</code>](#Database)  
**Read only**: true  
<a name="Database+version"></a>

### database.version : <code>Integer</code>
**Kind**: instance property of [<code>Database</code>](#Database)  
**Read only**: true  
<a name="Database+read"></a>

### database.read(...storeNames) ⇒ [<code>Array.&lt;Store&gt;</code>](#Store)
**Kind**: instance method of [<code>Database</code>](#Database)  
**Returns**: [<code>Array.&lt;Store&gt;</code>](#Store) - Array of stores  

| Param | Type | Description |
| --- | --- | --- |
| ...storeNames | <code>String</code> | One or more store names, separeted by comma |

<a name="Database+write"></a>

### database.write(...storeNames) ⇒ [<code>Array.&lt;Store&gt;</code>](#Store)
**Kind**: instance method of [<code>Database</code>](#Database)  
**Returns**: [<code>Array.&lt;Store&gt;</code>](#Store) - Array of stores  

| Param | Type |
| --- | --- |
| ...storeNames | <code>String</code> | 

<a name="Database+close"></a>

### database.close()
**Kind**: instance method of [<code>Database</code>](#Database)  
<a name="QueryVerb"></a>

## QueryVerb : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type |
| --- | --- |
| key | <code>String</code> | 
| op | <code>String</code> | 
| value | <code>String</code> \| <code>Array.&lt;String&gt;</code> | 

<a name="QueryObject"></a>

## QueryObject : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Default |
| --- | --- | --- |
| query | [<code>QueryVerb</code>](#QueryVerb) \| [<code>Array.&lt;QueryVerb&gt;</code>](#QueryVerb) |  | 
| update | [<code>QueryVerb</code>](#QueryVerb) \| [<code>Array.&lt;QueryVerb&gt;</code>](#QueryVerb) |  | 
| remove | [<code>QueryVerb</code>](#QueryVerb) \| [<code>Array.&lt;QueryVerb&gt;</code>](#QueryVerb) |  | 
| [limit] | <code>Integer</code> | <code>0</code> | 
| [reverse] | <code>Boolean</code> | <code>false</code> | 

