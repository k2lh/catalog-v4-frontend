<template>
  <div id="NotFound" class="page-body">
    <div class="container">
      <main id="maincontent" class="page-content">
        <div class="background">
          <div class="bx--grid">
            <div class="bx--row">
              <div class="bx--col">
                <p class="bx--type-expressive-heading-04 fourohfour">
                  Whoops, page not found!
                </p>
                <p class="bx--type-expressive-heading-04 fourohfour padtop35">
                  We'll keep looking. In the meantime, check the main page and try again.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<style lang="scss" scoped>

  .background {
    background-image: url("../assets/img/fourohfour.jpg");
    background-position: center;
    background-size: cover;
  }

  .page-content {
    padding-top: 0;
  }
  .bx--row {
    height: 60rem;
    padding-top: 4rem;
  }
  .fourohfour {
    width: 40%;
  }

</style>
