;(function() {
  // Element
  var $dndArea = document.getElementById('dnd-area');
  var $thumbnailArea = document.getElementById('thumbnail-area');

  /**
   * bind Drag and Drop Event
   */
  var bindEvent = function() {
    $dndArea.addEventListener('change', changeHandler);

    $dndArea.addEventListener('dragenter', function(e) {
      // ブラウザの挙動を無效化するために e.preventDefault();
      e.preventDefault();
    });
    $dndArea.addEventListener('dragover', function(e)  {
      // ブラウザの挙動を無效化するために e.preventDefault();
      e.preventDefault();
    });
    $dndArea.addEventListener('dragleave', function(e)  {
      // ブラウザの挙動を無效化するために e.preventDefault();
      e.preventDefault();
    });
    $dndArea.addEventListener('drop', function(e)  {
      // ブラウザの挙動を無效化するために e.preventDefault();
      e.preventDefault();

      changeHandler(e, e.dataTransfer.files[0]);
    });
  }

  /**
   * Change Handler
   */
  var changeHandler = function(e, data) {
    // drag and dropの場合は e.dataTransfer.files[0] を使用
    var file = data === undefined ? e.target.files[0] : data;

    // 拡張子チェック
    if (!file.type.match(/^image\/(png|jpg|jpeg|gif)$/)) {
      return;
    }

    // 容量チェック(5MB)
    if (5 * 1024 * 1024 <= file.size) {
      return;
    }

    var image = new Image();
    // var canvas = document.createElement('canvas');
    var canvas = document.getElementById('thumbnail');
    var fileReader = new FileReader();

    fileReader.onload = (e) => {
      var base64 = e.target.result;

      // imgタグに表示する場合はimg要素のsrc属性にセット
      // $img.src = base64;

      image.onload = () => {
        canvas.width = image.width;
        canvas.height = image.height;
        var ctx = canvas.getContext('2d');

        // s:sourceImage, d:destinationCanvas
        // ctx.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh)
        ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, image.width, image.height);
      };
      image.src = base64;
    };

    fileReader.readAsDataURL(file);
  }

  // Ready
  window.addEventListener('load', function() {
    bindEvent();
  })
})();
