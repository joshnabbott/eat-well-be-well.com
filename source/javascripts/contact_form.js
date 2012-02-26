(function() {
  var ContactForm;

  window.ContactForm = ContactForm = (function() {

    function ContactForm(form, options) {
      var self;
      this.form = form;
      self = this;
      this.settings = $.extend({
        requiredFields: "",
        updateonsuccess: "",
        updateonfailure: ""
      }, options);
      this.form.submit(function(e) {
        e.preventDefault();
        self.errors = [];
        if (self.validateInputs()) return self.send();
      });
      $(".field_with_errors").live("blur", function(event) {
        var element;
        element = $(event.currentTarget);
        if (element.val()) return element.removeClass("field_with_errors");
      });
    }

    ContactForm.prototype.validateInputs = function() {
      var self;
      self = this;
      this.settings.requiredFields.each(function(index, field) {
        if ($(field).val()) {
          return $(field).removeClass("field_with_errors");
        } else {
          self.errors.push(field);
          return $(field).addClass("field_with_errors");
        }
      });
      if (self.errors.length === 0) {
        return true;
      } else {
        return false;
      }
    };

    ContactForm.prototype.send = function() {
      var self;
      self = this;
      return $.ajax(this.form.attr("action"), {
        type: 'POST',
        data: this.form.serialize(),
        beforeSend: function(xhr) {
          return xhr.setRequestHeader("Authorization", "Basic dGVlazpjYXQ=");
        },
        error: function(xhr, textStatus, errorThrown) {
          return self.settings.updateOnFailure.prepend($("#contact-form-error").html());
        },
        success: function(data, textStatus, jqXHR) {
          self.form.remove();
          return self.settings.updateOnSuccess.html($("#contact-form-thank-you").html());
        }
      });
    };

    return ContactForm;

  })();

}).call(this);
