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
        beforeSend: function(xhr) {
          return xhr.setRequestHeader("Authorization", "Basic dGVlazpjYXQ=");
        },
        error: function(xhr, textStatus, errorThrown) {
          return self.settings.updateOnFailure.prepend("There was a problem sending your message. Please try again.");
        },
        success: function(data, textStatus, jqXHR) {
          self.form.remove();
          return self.settings.updateOnSuccess.html("<p><span>Thank you for getting in touch! I'm looking forward to understanding how I can help you reach your goals.</span></p>");
        }
      });
    };

    return ContactForm;

  })();

}).call(this);
