var Airtable = require('airtable');
// Get a base ID for an instance of art gallery example
var base = new Airtable({ apiKey: 'keyeHmVa7KzDpvMig' }).base('appUC3kbis11AP0cZ');

var loadData = function() {

    base('Yuki').select({
        // sort: [
        //     {field: 'Title', direction: 'asc'}
        // ]
    }).eachPage(function page(records, fetchNextPage) {
        records.shift();
        console.log(records);
        for (var index = 0; index < records.length; index++) {
            var record = records[index];
            
            console.log('Retrieved ', record.get('Title'));
            console.log(record);

            // 创建 h2 元素信息
            var titleNode = document.createTextNode(record.get('Title'));
            var h2Node = document.createElement('h2');
            h2Node.appendChild(titleNode);

            // 创建 类为 item-cell-text 的 div 元素信息
            var descriptionNode = document.createTextNode(record.get('Description'));
            var pNode = document.createElement('p');
            pNode.appendChild(descriptionNode);
            var itemCellTextNode = document.createElement('div');
            itemCellTextNode.className = 'item-cell-text';
            itemCellTextNode.appendChild(pNode);
            
            // 创建 img 元素信息
            var imageNode = document.createElement('img');
            var imageUrl = record.get('Image')[0].url;
            imageNode.src = imageUrl;
            imageNode.alt = record.get('Alt');

            // 创建 a 元素
            var aNode = document.createElement('a');
            aNode.setAttribute('data-image-url', imageUrl);
            aNode.href = 'javascript:void(0);';
            aNode.onclick = function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                var detailImage = document.getElementById('detail-image');
                var detailImageUrl = this.getAttribute('data-image-url');
                detailImage.src = detailImageUrl;
                var detailView = document.getElementsByClassName('detail-view')[0];
                detailView.style.display = 'block';
                setTimeout(function() {
                    document.body.className = 'iscovered';
                    detailView.style.opacity = 1;
                    return;
                }, 100);
                return false;
            };
            var aTextNode = document.createTextNode('Read more about me');
            aNode.appendChild(aTextNode);

            // 创建 类为 item-cell-more 的 div 元素信息
            var itemCellMoreNode = document.createElement('p');
            itemCellMoreNode.className = 'item-cell-more';
            itemCellMoreNode.appendChild(aNode);

            var itemCell = document.createElement('div');
            itemCell.className = 'item-cell';
            itemCell.appendChild(h2Node);
            itemCell.appendChild(itemCellTextNode);
            itemCell.appendChild(imageNode);
            itemCell.appendChild(itemCellMoreNode);
            
            var itemList = document.getElementsByClassName('item-list')[0];
            itemList.appendChild(itemCell);
        }
        fetchNextPage();
    }, function done(error) {
        console.log(error);
    });
};

loadData();

var initDetailView = function() {
    var detailView = document.getElementsByClassName('detail-view')[0];
    detailView.onclick = function() {
        detailView.style.opacity = 0;
        document.body.className = '';
        setTimeout(function() {
            detailView.style.display = 'none';
            return;
        }, 600);
    };
    return;
};

initDetailView();

// var initNav = function() {
//     var collectionNode = document.getElementById('collection');
//     collectionNode.onclick = function() {
//         base('Table1').select({
//             // sort: [
//             //     {field: 'Title', direction: 'asc'}
//             // ]
//         })
//     };
// }
