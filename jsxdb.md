<a name="module_JSxDB"></a>

## JSxDB
**Author**: Stephan Cieszynski  

* [JSxDB](#module_JSxDB)
    * [~Query](#module_JSxDB..Query)
        * [.reverse()](#module_JSxDB..Query+reverse) ⇒ <code>this</code>
        * [.limit(int)](#module_JSxDB..Query+limit) ⇒ <code>this</code>
        * [.query()](#module_JSxDB..Query+query) ⇒ <code>Promise</code>
        * [.delete()](#module_JSxDB..Query+delete) ⇒ <code>Promise</code>
        * [.update()](#module_JSxDB..Query+update) ⇒ <code>Promise</code>
        * [.and(indexName, ...keyRangeParams)](#module_JSxDB..Query+and) ⇒ <code>this</code>
        * [.or(indexName, ...keyRangeParams)](#module_JSxDB..Query+or) ⇒ <code>this</code>
    * [~Store](#module_JSxDB..Store)
        * [.autoincrement](#module_JSxDB..Store+autoincrement) : <code>Boolean</code>
        * [.indexnames](#module_JSxDB..Store+indexnames) : <code>Array.&lt;String&gt;</code>
        * [.keypath](#module_JSxDB..Store+keypath) : <code>String</code>
        * [.name](#module_JSxDB..Store+name) : <code>String</code>
        * [.abort()](#module_JSxDB..Store+abort)
        * [.add(obj, [key])](#module_JSxDB..Store+add) ⇒ <code>Promise</code>
        * [.clear()](#module_JSxDB..Store+clear) ⇒ <code>Promise</code>
        * [.commit()](#module_JSxDB..Store+commit)
        * [.count(keyOrKeyRange)](#module_JSxDB..Store+count) ⇒ <code>Promise</code>
        * [.delete(keyOrKeyRange)](#module_JSxDB..Store+delete) ⇒ <code>Promise</code>
        * [.get(keyOrKeyRange)](#module_JSxDB..Store+get) ⇒ <code>Promise</code>
        * [.getAll(keyOrKeyRange, limit)](#module_JSxDB..Store+getAll) ⇒ <code>Promise</code>
        * [.getAllKeys(keyRange, limit)](#module_JSxDB..Store+getAllKeys) ⇒ <code>Promise</code>
        * [.getAllRecords(options)](#module_JSxDB..Store+getAllRecords) ⇒ <code>Promise</code>
        * [.getKey(keyOrKeyRange)](#module_JSxDB..Store+getKey) ⇒ <code>Promise</code>
        * [.put(obj, key)](#module_JSxDB..Store+put) ⇒ <code>Promise</code>
        * [.where(indexName, ...keyRangeParams)](#module_JSxDB..Store+where) ⇒ <code>Query</code>
        * [.ignoreCase(indexName, str, [startsWith])](#module_JSxDB..Store+ignoreCase) ⇒ <code>Promise</code>
    * [~Database](#module_JSxDB..Database)
        * [.name](#module_JSxDB..Database+name) : <code>String</code>
        * [.storenames](#module_JSxDB..Database+storenames) : <code>Array.&lt;String&gt;</code>
        * [.version](#module_JSxDB..Database+version) : <code>Integer</code>
        * [.read(...storeNames)](#module_JSxDB..Database+read) ⇒ <code>Array.&lt;Store&gt;</code>
        * [.write(...storeNames)](#module_JSxDB..Database+write) ⇒ <code>Array.&lt;Store&gt;</code>
        * [.close()](#module_JSxDB..Database+close)
    * [~JSxDB](#module_JSxDB..JSxDB)
        * [.databases](#module_JSxDB..JSxDB.databases) : <code>Promise</code>
        * [.init(name, scheme)](#module_JSxDB..JSxDB.init) ⇒ <code>Promise</code>
        * [.open(name)](#module_JSxDB..JSxDB.open) ⇒ <code>Promise</code>
        * [.remove(name)](#module_JSxDB..JSxDB.remove) ⇒ <code>Promise</code>
        * [.eq(z)](#module_JSxDB..JSxDB.eq) ⇒ <code>IDBKeyRange</code>
        * [.le(x)](#module_JSxDB..JSxDB.le) ⇒ <code>IDBKeyRange</code>
        * [.lt(x)](#module_JSxDB..JSxDB.lt) ⇒ <code>IDBKeyRange</code>
        * [.ge(y)](#module_JSxDB..JSxDB.ge) ⇒ <code>IDBKeyRange</code>
        * [.gt(y)](#module_JSxDB..JSxDB.gt) ⇒ <code>IDBKeyRange</code>
        * [.between(x, y, bx, by)](#module_JSxDB..JSxDB.between) ⇒ <code>IDBKeyRange</code>
        * [.startsWith(s)](#module_JSxDB..JSxDB.startsWith) ⇒ <code>IDBKeyRange</code>
    * [~permutation(permutable)](#module_JSxDB..permutation) ⇒ <code>Array.&lt;String&gt;</code>
    * [~prepare(...keyRangeParams)](#module_JSxDB..prepare) ⇒ <code>IDBKeyRange</code>
    * [~onupgradeneeded(db, oldVersion, newVersion, scheme)](#module_JSxDB..onupgradeneeded)

<a name="module_JSxDB..Query"></a>

### JSxDB~Query
**Kind**: inner class of [<code>JSxDB</code>](#module_JSxDB)  

* [~Query](#module_JSxDB..Query)
    * [.reverse()](#module_JSxDB..Query+reverse) ⇒ <code>this</code>
    * [.limit(int)](#module_JSxDB..Query+limit) ⇒ <code>this</code>
    * [.query()](#module_JSxDB..Query+query) ⇒ <code>Promise</code>
    * [.delete()](#module_JSxDB..Query+delete) ⇒ <code>Promise</code>
    * [.update()](#module_JSxDB..Query+update) ⇒ <code>Promise</code>
    * [.and(indexName, ...keyRangeParams)](#module_JSxDB..Query+and) ⇒ <code>this</code>
    * [.or(indexName, ...keyRangeParams)](#module_JSxDB..Query+or) ⇒ <code>this</code>

<a name="module_JSxDB..Query+reverse"></a>

#### query.reverse() ⇒ <code>this</code>
**Kind**: instance method of [<code>Query</code>](#module_JSxDB..Query)  
<a name="module_JSxDB..Query+limit"></a>

#### query.limit(int) ⇒ <code>this</code>
**Kind**: instance method of [<code>Query</code>](#module_JSxDB..Query)  

| Param | Type |
| --- | --- |
| int | <code>Integer</code> | 

<a name="module_JSxDB..Query+query"></a>

#### query.query() ⇒ <code>Promise</code>
**Kind**: instance method of [<code>Query</code>](#module_JSxDB..Query)  
<a name="module_JSxDB..Query+delete"></a>

#### query.delete() ⇒ <code>Promise</code>
**Kind**: instance method of [<code>Query</code>](#module_JSxDB..Query)  
<a name="module_JSxDB..Query+update"></a>

#### query.update() ⇒ <code>Promise</code>
**Kind**: instance method of [<code>Query</code>](#module_JSxDB..Query)  
<a name="module_JSxDB..Query+and"></a>

#### query.and(indexName, ...keyRangeParams) ⇒ <code>this</code>
**Kind**: instance method of [<code>Query</code>](#module_JSxDB..Query)  

| Param | Type |
| --- | --- |
| indexName | <code>String</code> | 
| ...keyRangeParams | <code>String</code> | 

<a name="module_JSxDB..Query+or"></a>

#### query.or(indexName, ...keyRangeParams) ⇒ <code>this</code>
**Kind**: instance method of [<code>Query</code>](#module_JSxDB..Query)  

| Param | Type |
| --- | --- |
| indexName | <code>String</code> | 
| ...keyRangeParams | <code>String</code> | 

<a name="module_JSxDB..Store"></a>

### JSxDB~Store
**Kind**: inner class of [<code>JSxDB</code>](#module_JSxDB)  

* [~Store](#module_JSxDB..Store)
    * [.autoincrement](#module_JSxDB..Store+autoincrement) : <code>Boolean</code>
    * [.indexnames](#module_JSxDB..Store+indexnames) : <code>Array.&lt;String&gt;</code>
    * [.keypath](#module_JSxDB..Store+keypath) : <code>String</code>
    * [.name](#module_JSxDB..Store+name) : <code>String</code>
    * [.abort()](#module_JSxDB..Store+abort)
    * [.add(obj, [key])](#module_JSxDB..Store+add) ⇒ <code>Promise</code>
    * [.clear()](#module_JSxDB..Store+clear) ⇒ <code>Promise</code>
    * [.commit()](#module_JSxDB..Store+commit)
    * [.count(keyOrKeyRange)](#module_JSxDB..Store+count) ⇒ <code>Promise</code>
    * [.delete(keyOrKeyRange)](#module_JSxDB..Store+delete) ⇒ <code>Promise</code>
    * [.get(keyOrKeyRange)](#module_JSxDB..Store+get) ⇒ <code>Promise</code>
    * [.getAll(keyOrKeyRange, limit)](#module_JSxDB..Store+getAll) ⇒ <code>Promise</code>
    * [.getAllKeys(keyRange, limit)](#module_JSxDB..Store+getAllKeys) ⇒ <code>Promise</code>
    * [.getAllRecords(options)](#module_JSxDB..Store+getAllRecords) ⇒ <code>Promise</code>
    * [.getKey(keyOrKeyRange)](#module_JSxDB..Store+getKey) ⇒ <code>Promise</code>
    * [.put(obj, key)](#module_JSxDB..Store+put) ⇒ <code>Promise</code>
    * [.where(indexName, ...keyRangeParams)](#module_JSxDB..Store+where) ⇒ <code>Query</code>
    * [.ignoreCase(indexName, str, [startsWith])](#module_JSxDB..Store+ignoreCase) ⇒ <code>Promise</code>

<a name="module_JSxDB..Store+autoincrement"></a>

#### store.autoincrement : <code>Boolean</code>
**Kind**: instance property of [<code>Store</code>](#module_JSxDB..Store)  
**Read only**: true  
<a name="module_JSxDB..Store+indexnames"></a>

#### store.indexnames : <code>Array.&lt;String&gt;</code>
**Kind**: instance property of [<code>Store</code>](#module_JSxDB..Store)  
**Read only**: true  
<a name="module_JSxDB..Store+keypath"></a>

#### store.keypath : <code>String</code>
**Kind**: instance property of [<code>Store</code>](#module_JSxDB..Store)  
**Read only**: true  
<a name="module_JSxDB..Store+name"></a>

#### store.name : <code>String</code>
**Kind**: instance property of [<code>Store</code>](#module_JSxDB..Store)  
**Read only**: true  
<a name="module_JSxDB..Store+abort"></a>

#### store.abort()
**Kind**: instance method of [<code>Store</code>](#module_JSxDB..Store)  
<a name="module_JSxDB..Store+add"></a>

#### store.add(obj, [key]) ⇒ <code>Promise</code>
**Kind**: instance method of [<code>Store</code>](#module_JSxDB..Store)  

| Param | Type |
| --- | --- |
| obj | <code>Object</code> | 
| [key] | <code>Key</code> | 

<a name="module_JSxDB..Store+clear"></a>

#### store.clear() ⇒ <code>Promise</code>
**Kind**: instance method of [<code>Store</code>](#module_JSxDB..Store)  
<a name="module_JSxDB..Store+commit"></a>

#### store.commit()
**Kind**: instance method of [<code>Store</code>](#module_JSxDB..Store)  
<a name="module_JSxDB..Store+count"></a>

#### store.count(keyOrKeyRange) ⇒ <code>Promise</code>
**Kind**: instance method of [<code>Store</code>](#module_JSxDB..Store)  

| Param | Type |
| --- | --- |
| keyOrKeyRange | <code>KeyOrKeyRange</code> | 

<a name="module_JSxDB..Store+delete"></a>

#### store.delete(keyOrKeyRange) ⇒ <code>Promise</code>
**Kind**: instance method of [<code>Store</code>](#module_JSxDB..Store)  

| Param | Type |
| --- | --- |
| keyOrKeyRange | <code>KeyOrKeyRange</code> | 

<a name="module_JSxDB..Store+get"></a>

#### store.get(keyOrKeyRange) ⇒ <code>Promise</code>
**Kind**: instance method of [<code>Store</code>](#module_JSxDB..Store)  

| Param | Type |
| --- | --- |
| keyOrKeyRange | <code>KeyOrKeyRange</code> | 

<a name="module_JSxDB..Store+getAll"></a>

#### store.getAll(keyOrKeyRange, limit) ⇒ <code>Promise</code>
**Kind**: instance method of [<code>Store</code>](#module_JSxDB..Store)  

| Param | Type |
| --- | --- |
| keyOrKeyRange | <code>KeyOrKeyRange</code> | 
| limit | <code>Integer</code> | 

<a name="module_JSxDB..Store+getAllKeys"></a>

#### store.getAllKeys(keyRange, limit) ⇒ <code>Promise</code>
**Kind**: instance method of [<code>Store</code>](#module_JSxDB..Store)  

| Param | Type |
| --- | --- |
| keyRange | <code>IDBKeyRange</code> | 
| limit | <code>Integer</code> | 

<a name="module_JSxDB..Store+getAllRecords"></a>

#### store.getAllRecords(options) ⇒ <code>Promise</code>
**Kind**: instance method of [<code>Store</code>](#module_JSxDB..Store)  

| Param | Type |
| --- | --- |
| options | <code>Options</code> | 

<a name="module_JSxDB..Store+getKey"></a>

#### store.getKey(keyOrKeyRange) ⇒ <code>Promise</code>
**Kind**: instance method of [<code>Store</code>](#module_JSxDB..Store)  

| Param | Type |
| --- | --- |
| keyOrKeyRange | <code>KeyOrKeyRange</code> | 

<a name="module_JSxDB..Store+put"></a>

#### store.put(obj, key) ⇒ <code>Promise</code>
**Kind**: instance method of [<code>Store</code>](#module_JSxDB..Store)  

| Param | Type |
| --- | --- |
| obj | <code>Object</code> | 
| key | <code>Key</code> | 

<a name="module_JSxDB..Store+where"></a>

#### store.where(indexName, ...keyRangeParams) ⇒ <code>Query</code>
**Kind**: instance method of [<code>Store</code>](#module_JSxDB..Store)  

| Param | Type |
| --- | --- |
| indexName | <code>String</code> | 
| ...keyRangeParams | <code>String</code> | 

<a name="module_JSxDB..Store+ignoreCase"></a>

#### store.ignoreCase(indexName, str, [startsWith]) ⇒ <code>Promise</code>
**Kind**: instance method of [<code>Store</code>](#module_JSxDB..Store)  

| Param | Type | Default |
| --- | --- | --- |
| indexName | <code>String</code> |  | 
| str | <code>String</code> |  | 
| [startsWith] | <code>Boolean</code> | <code>false</code> | 

<a name="module_JSxDB..Database"></a>

### JSxDB~Database
**Kind**: inner class of [<code>JSxDB</code>](#module_JSxDB)  

* [~Database](#module_JSxDB..Database)
    * [.name](#module_JSxDB..Database+name) : <code>String</code>
    * [.storenames](#module_JSxDB..Database+storenames) : <code>Array.&lt;String&gt;</code>
    * [.version](#module_JSxDB..Database+version) : <code>Integer</code>
    * [.read(...storeNames)](#module_JSxDB..Database+read) ⇒ <code>Array.&lt;Store&gt;</code>
    * [.write(...storeNames)](#module_JSxDB..Database+write) ⇒ <code>Array.&lt;Store&gt;</code>
    * [.close()](#module_JSxDB..Database+close)

<a name="module_JSxDB..Database+name"></a>

#### database.name : <code>String</code>
**Kind**: instance property of [<code>Database</code>](#module_JSxDB..Database)  
**Read only**: true  
<a name="module_JSxDB..Database+storenames"></a>

#### database.storenames : <code>Array.&lt;String&gt;</code>
**Kind**: instance property of [<code>Database</code>](#module_JSxDB..Database)  
**Read only**: true  
<a name="module_JSxDB..Database+version"></a>

#### database.version : <code>Integer</code>
**Kind**: instance property of [<code>Database</code>](#module_JSxDB..Database)  
**Read only**: true  
<a name="module_JSxDB..Database+read"></a>

#### database.read(...storeNames) ⇒ <code>Array.&lt;Store&gt;</code>
**Kind**: instance method of [<code>Database</code>](#module_JSxDB..Database)  
**Returns**: <code>Array.&lt;Store&gt;</code> - Array of stores  

| Param | Type | Description |
| --- | --- | --- |
| ...storeNames | <code>String</code> | One or more store names, separeted by comma |

<a name="module_JSxDB..Database+write"></a>

#### database.write(...storeNames) ⇒ <code>Array.&lt;Store&gt;</code>
**Kind**: instance method of [<code>Database</code>](#module_JSxDB..Database)  
**Returns**: <code>Array.&lt;Store&gt;</code> - Array of stores  

| Param | Type |
| --- | --- |
| ...storeNames | <code>String</code> | 

<a name="module_JSxDB..Database+close"></a>

#### database.close()
**Kind**: instance method of [<code>Database</code>](#module_JSxDB..Database)  
<a name="module_JSxDB..JSxDB"></a>

### JSxDB~JSxDB
**Kind**: inner constant of [<code>JSxDB</code>](#module_JSxDB)  

* [~JSxDB](#module_JSxDB..JSxDB)
    * [.databases](#module_JSxDB..JSxDB.databases) : <code>Promise</code>
    * [.init(name, scheme)](#module_JSxDB..JSxDB.init) ⇒ <code>Promise</code>
    * [.open(name)](#module_JSxDB..JSxDB.open) ⇒ <code>Promise</code>
    * [.remove(name)](#module_JSxDB..JSxDB.remove) ⇒ <code>Promise</code>
    * [.eq(z)](#module_JSxDB..JSxDB.eq) ⇒ <code>IDBKeyRange</code>
    * [.le(x)](#module_JSxDB..JSxDB.le) ⇒ <code>IDBKeyRange</code>
    * [.lt(x)](#module_JSxDB..JSxDB.lt) ⇒ <code>IDBKeyRange</code>
    * [.ge(y)](#module_JSxDB..JSxDB.ge) ⇒ <code>IDBKeyRange</code>
    * [.gt(y)](#module_JSxDB..JSxDB.gt) ⇒ <code>IDBKeyRange</code>
    * [.between(x, y, bx, by)](#module_JSxDB..JSxDB.between) ⇒ <code>IDBKeyRange</code>
    * [.startsWith(s)](#module_JSxDB..JSxDB.startsWith) ⇒ <code>IDBKeyRange</code>

<a name="module_JSxDB..JSxDB.databases"></a>

#### JSxDB.databases : <code>Promise</code>
**Kind**: static property of [<code>JSxDB</code>](#module_JSxDB..JSxDB)  
<a name="module_JSxDB..JSxDB.init"></a>

#### JSxDB.init(name, scheme) ⇒ <code>Promise</code>
**Kind**: static method of [<code>JSxDB</code>](#module_JSxDB..JSxDB)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | bla |
| scheme | <code>Object</code> |  |

<a name="module_JSxDB..JSxDB.open"></a>

#### JSxDB.open(name) ⇒ <code>Promise</code>
**Kind**: static method of [<code>JSxDB</code>](#module_JSxDB..JSxDB)  

| Param | Type |
| --- | --- |
| name | <code>String</code> | 

<a name="module_JSxDB..JSxDB.remove"></a>

#### JSxDB.remove(name) ⇒ <code>Promise</code>
**Kind**: static method of [<code>JSxDB</code>](#module_JSxDB..JSxDB)  

| Param | Type |
| --- | --- |
| name | <code>String</code> | 

<a name="module_JSxDB..JSxDB.eq"></a>

#### JSxDB.eq(z) ⇒ <code>IDBKeyRange</code>
**Kind**: static method of [<code>JSxDB</code>](#module_JSxDB..JSxDB)  

| Param | Type |
| --- | --- |
| z | <code>Key</code> | 

<a name="module_JSxDB..JSxDB.le"></a>

#### JSxDB.le(x) ⇒ <code>IDBKeyRange</code>
**Kind**: static method of [<code>JSxDB</code>](#module_JSxDB..JSxDB)  

| Param | Type |
| --- | --- |
| x | <code>\*</code> | 

<a name="module_JSxDB..JSxDB.lt"></a>

#### JSxDB.lt(x) ⇒ <code>IDBKeyRange</code>
**Kind**: static method of [<code>JSxDB</code>](#module_JSxDB..JSxDB)  

| Param | Type |
| --- | --- |
| x | <code>\*</code> | 

<a name="module_JSxDB..JSxDB.ge"></a>

#### JSxDB.ge(y) ⇒ <code>IDBKeyRange</code>
**Kind**: static method of [<code>JSxDB</code>](#module_JSxDB..JSxDB)  

| Param | Type |
| --- | --- |
| y | <code>\*</code> | 

<a name="module_JSxDB..JSxDB.gt"></a>

#### JSxDB.gt(y) ⇒ <code>IDBKeyRange</code>
**Kind**: static method of [<code>JSxDB</code>](#module_JSxDB..JSxDB)  

| Param | Type |
| --- | --- |
| y | <code>\*</code> | 

<a name="module_JSxDB..JSxDB.between"></a>

#### JSxDB.between(x, y, bx, by) ⇒ <code>IDBKeyRange</code>
**Kind**: static method of [<code>JSxDB</code>](#module_JSxDB..JSxDB)  

| Param | Type |
| --- | --- |
| x | <code>\*</code> | 
| y | <code>\*</code> | 
| bx | <code>\*</code> | 
| by | <code>\*</code> | 

<a name="module_JSxDB..JSxDB.startsWith"></a>

#### JSxDB.startsWith(s) ⇒ <code>IDBKeyRange</code>
**Kind**: static method of [<code>JSxDB</code>](#module_JSxDB..JSxDB)  

| Param | Type |
| --- | --- |
| s | <code>\*</code> | 

<a name="module_JSxDB..permutation"></a>

### JSxDB~permutation(permutable) ⇒ <code>Array.&lt;String&gt;</code>
Find all lowercase and uppercase combinations 
of a string called from ingnoreCase

**Kind**: inner method of [<code>JSxDB</code>](#module_JSxDB)  

| Param | Type |
| --- | --- |
| permutable | <code>String</code> | 

<a name="module_JSxDB..prepare"></a>

### JSxDB~prepare(...keyRangeParams) ⇒ <code>IDBKeyRange</code>
**Kind**: inner method of [<code>JSxDB</code>](#module_JSxDB)  

| Param | Type |
| --- | --- |
| ...keyRangeParams | <code>String</code> | 

<a name="module_JSxDB..onupgradeneeded"></a>

### JSxDB~onupgradeneeded(db, oldVersion, newVersion, scheme)
**Kind**: inner method of [<code>JSxDB</code>](#module_JSxDB)  

| Param | Type |
| --- | --- |
| db | <code>IDBDatabase</code> | 
| oldVersion | <code>Integer</code> | 
| newVersion | <code>Integer</code> | 
| scheme | <code>Object</code> | 

